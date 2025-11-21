// Inicializar ícones Lucide
lucide.createIcons();

// --- DADOS ---
const symptomCategories = [
    'Dor no peito ou coração acelerado',
    'Problemas de pele (manchas, coceira)',
    'Dores articulares ou musculares',
    'Dor de cabeça frequente ou tontura',
    'Problemas digestivos / dor barriga',
    'Alterações na visão',
    'Dificuldade para respirar / tosse',
    'Ansiedade, depressão ou insônia',
    'Problemas urinários',
    'Questões ginecológicas',
    'Dor de ouvido, nariz ou garganta',
    'Dor de dente / boca'
];

// --- ELEMENTOS DO DOM ---
const step1 = document.getElementById('step-1');
const step2 = document.getElementById('step-2');
const resultScreen = document.getElementById('result-screen');

const indicator1 = document.getElementById('indicator-step-1');
const indicator2 = document.getElementById('indicator-step-2');
const progressLine = document.getElementById('progress-line');

const symptomsGrid = document.getElementById('symptoms-grid');
const resultSpecialty = document.getElementById('result-specialty');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

// --- INICIALIZAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
    // Gerar checkboxes de sintomas dinamicamente
    symptomsGrid.innerHTML = symptomCategories.map(symptom => `
        <label class="flex items-center gap-3 p-3 border rounded-lg hover:bg-green-50 cursor-pointer transition">
            <input type="checkbox" value="${symptom}" class="symptom-checkbox">
            <span class="text-sm text-gray-700">${symptom}</span>
        </label>
    `).join('');
});

// --- NAVEGAÇÃO MOBILE ---
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Scroll suave (helper)
function scrollToSection(id) {
    const el = document.getElementById(id);
    if(el) {
        el.scrollIntoView({ behavior: 'smooth' });
        mobileMenu.classList.add('hidden'); // fecha menu se aberto
    }
}

// --- LÓGICA DA TRIAGEM ---

function nextStep() {
    // Validação simples
    const name = document.getElementById('input-name').value;
    const age = document.getElementById('input-age').value;
    const phone = document.getElementById('input-phone').value;

    if (!name || !age || !phone) {
        alert("Por favor, preencha os campos obrigatórios (Nome, Idade, WhatsApp).");
        return;
    }

    // Transição visual
    step1.classList.add('hidden');
    step2.classList.remove('hidden');
    
    // Atualizar indicadores
    indicator1.classList.replace('bg-brand-700', 'bg-green-200');
    indicator1.classList.replace('text-white', 'text-green-800');
    indicator1.innerHTML = '<i data-lucide="check" class="w-4 h-4"></i>';
    lucide.createIcons(); // Re-renderizar ícone novo

    indicator2.classList.replace('bg-gray-200', 'bg-brand-700');
    indicator2.classList.replace('text-gray-500', 'text-white');
    
    progressLine.style.width = '100%';
    
    // Scroll para topo da área
    document.getElementById('triagem').scrollIntoView({behavior: 'smooth'});
}

function prevStep() {
    step2.classList.add('hidden');
    step1.classList.remove('hidden');

    // Resetar indicadores
    indicator1.classList.replace('bg-green-200', 'bg-brand-700');
    indicator1.classList.replace('text-green-800', 'text-white');
    indicator1.innerText = '1';
    
    indicator2.classList.replace('bg-brand-700', 'bg-gray-200');
    indicator2.classList.replace('text-white', 'text-gray-500');
    
    progressLine.style.width = '0%';
}

function finishTriage() {
    // Coletar sintomas marcados
    const checkboxes = document.querySelectorAll('.symptom-checkbox:checked');
    const selectedSymptoms = Array.from(checkboxes).map(cb => cb.value);
    const description = document.getElementById('input-desc').value;
    const urgency = document.getElementById('input-urgency').value;

    if (selectedSymptoms.length === 0) {
        alert("Selecione pelo menos um sintoma.");
        return;
    }
    if (!description || !urgency) {
        alert("Por favor, preencha a descrição e a urgência.");
        return;
    }

    // Simular processamento
    const btn = document.querySelector('button[onclick="finishTriage()"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = "Analisando...";
    btn.disabled = true;

    setTimeout(() => {
        const specialty = calculateSpecialty(selectedSymptoms);
        
        step2.classList.add('hidden');
        resultScreen.classList.remove('hidden');
        resultSpecialty.innerText = specialty;
        
        // Scroll
        document.getElementById('triagem').scrollIntoView({behavior: 'smooth'});
        
        // Reset botão (caso precise voltar)
        btn.innerHTML = originalText;
        btn.disabled = false;
    }, 1500); // Delay fake de 1.5s para parecer IA
}

function restartTriage() {
    // Resetar form
    document.getElementById('step-1').querySelectorAll('input').forEach(i => i.value = '');
    document.getElementById('step-2').querySelectorAll('textarea, select').forEach(i => i.value = '');
    document.querySelectorAll('.symptom-checkbox').forEach(cb => cb.checked = false);

    // Voltar para tela 1
    resultScreen.classList.add('hidden');
    step1.classList.remove('hidden');
    prevStep(); // Reset visual indicators logic reuse
}

// Lógica de Recomendação (Simples "If/Else" baseada em palavras-chave)
function calculateSpecialty(symptoms) {
    const text = symptoms.join(' ').toLowerCase();
    
    if (text.includes('peito') || text.includes('coração')) return 'Cardiologista';
    if (text.includes('pele')) return 'Dermatologista';
    if (text.includes('articulares') || text.includes('musculares')) return 'Ortopedista';
    if (text.includes('cabeça') || text.includes('tontura')) return 'Neurologista';
    if (text.includes('digestivos') || text.includes('barriga')) return 'Gastroenterologista';
    if (text.includes('visão')) return 'Oftalmologista';
    if (text.includes('respirar') || text.includes('tosse')) return 'Pneumologista';
    if (text.includes('ansiedade') || text.includes('depressão')) return 'Psiquiatra';
    if (text.includes('urinários')) return 'Urologista';
    if (text.includes('ginecológicas')) return 'Ginecologista';
    if (text.includes('ouvido') || text.includes('nariz') || text.includes('garganta')) return 'Otorrinolaringologista';
    if (text.includes('dente')) return 'Dentista';
    
    return 'Clínico Geral';
}

