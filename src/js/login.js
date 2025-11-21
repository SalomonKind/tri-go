// src/js/login.js

// Inicializar ícones
lucide.createIcons();

function togglePassword() {
    const passwordInput = document.getElementById('passwordInput');
    const eyeIcon = document.getElementById('eyeIcon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        // Atualiza ícone (se estivesse usando SVG direto, trocaria o path, 
        // mas com Lucide re-renderizamos ou trocamos classes se necessário.
        // Aqui apenas trocamos a cor para indicar estado ativo visualmente)
        eyeIcon.classList.add('text-brand-600');
    } else {
        passwordInput.type = 'password';
        eyeIcon.classList.remove('text-brand-600');
    }
}

function handleLogin(event) {
    event.preventDefault(); // Impede o recarregamento padrão da página
    
    const btn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const btnLoader = document.getElementById('btnLoader');
    const formInputs = document.querySelectorAll('input');

    // 1. UX State: Loading
    // Desabilitar inputs para evitar edição durante carregamento
    formInputs.forEach(input => input.disabled = true);
    btn.disabled = true;
    btn.classList.add('cursor-not-allowed', 'opacity-80');
    
    // Trocar texto por loader
    btnText.innerText = "Autenticando...";
    btnLoader.classList.remove('hidden');

    // 2. Simulação de Requisição ao Servidor (Delay de 2 segundos)
    setTimeout(() => {
        // Sucesso!
        btnText.innerText = "Entrando...";
        btnLoader.classList.add('hidden');
        
        // Animação de saída (Fade Out do corpo)
        document.body.style.transition = "opacity 0.5s ease";
        document.body.style.opacity = "0";

        setTimeout(() => {
            // 3. Redirecionamento para a página principal
            window.location.href = "index.html";
        }, 500);

    }, 2000);
}