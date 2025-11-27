// 🟣 Perguntas
const questions = [
    { q: "1️⃣ Como você me descreveria?", options: ["Incrível", "Fofo(a)", "Legal", "Interessante"] },
    { q: "2️⃣ O que você sente quando fala comigo?", options: ["Alegria", "Vergonha", "Frio na barriga", "Carinho"] },
    { q: "3️⃣ O quanto você gosta de mim?", options: ["Muito", "Demais", "Pra caramba", "Um monte"] },
    { q: "4️⃣ Acha que combinamos juntos?", options: ["Sim 😳", "Com certeza 💗", "Muito", "Demais"] },
    { q: "5️⃣ Qual seria nosso encontro perfeito?", options: ["Cinema", "Piquenique", "Restaurante", "Passeio noturno"] },
    { q: "6️⃣ Se viajássemos, pra onde iríamos?", options: ["Praia", "Montanha", "Cidade grande", "Europa"] },
    { q: "7️⃣ Você acha que eu te faço bem?", options: ["Sim 💕", "Muito 😳", "Demais 💗", "Certeza!!"] },
    { q: "8️⃣ Já sentiu saudade de mim?", options: ["Sim", "Óbvio", "Sempre", "Demais 😔"] },
    { q: "9️⃣ Você acha que daríamos certo juntos?", options: ["Sim", "Muito", "Com certeza", "Óbvio 💞"] },

    // FINAL
    { q: "🔟 Agora a mais importante... você quer namorar comigo? ❤️", final: true }
];

let current = 0;

// ELEMENTOS
const card = document.getElementById("card");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const finalScreen = document.getElementById("finalScreen");

// NEON POR ETAPA
const pageColors = [
    "#ff009d", "#ae00ff", "#009dff", "#00ffaa", "#ff7a00",
    "#ff005e", "#b300ff", "#0099ff", "#00ffea", "#ff007c"
];

// 🟣 TELA DE LOADING
setTimeout(() => {
    document.getElementById("loading").style.display = "none";
    document.getElementById("app").classList.remove("hidden");
}, 1500);

// 🟣 PARTÍCULAS
function createParticles() {
    const particles = document.getElementById("particles");
    for (let i = 0; i < 35; i++) {
        const p = document.createElement("div");
        p.className = "particle";
        p.innerHTML = "💗";
        p.style.left = Math.random() * 100 + "%";
        p.style.animationDuration = (3 + Math.random() * 6) + "s";
        particles.appendChild(p);
    }
}
createParticles();

// 🟣 LÓGICA DAS QUESTÕES
function loadQuestion() {
    const qData = questions[current];

    card.classList.remove("fade");
    void card.offsetWidth;
    card.classList.add("fade");

    card.style.boxShadow = `0 0 25px ${pageColors[current]}`;

    questionEl.textContent = qData.q;
    optionsEl.innerHTML = "";

    if (qData.final) return finalQuestion();

    qData.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.style.background = pageColors[current];
        btn.style.color = "white";
        btn.onclick = () => {
            current++;
            loadQuestion();
        };
        optionsEl.appendChild(btn);
    });
}

// 🟣 PERGUNTA FINAL
function finalQuestion() {
    optionsEl.innerHTML = "";

    const yes = document.createElement("button");
    yes.textContent = "SIM 💗";
    yes.style.background = "#ff1493";
    yes.style.color = "white";
    yes.onclick = showFinalScreen;

    const no = document.createElement("button");
    no.id = "noBtn";
    no.textContent = "NÃO 😭";
    no.style.background = "#444";
    no.style.color = "white";

    no.onmouseover = () => {
        const x = (Math.random() * 160) - 80;
        const y = (Math.random() * 160) - 80;
        no.style.transform = `translate(${x}px, ${y}px)`;
    };

    optionsEl.appendChild(yes);
    optionsEl.appendChild(no);
}

// 🟣 TELA FINAL
function showFinalScreen() {
    card.style.display = "none";
    finalScreen.classList.remove("hidden");

    // CORAÇÕES SUBINDO
    setInterval(() => {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.innerHTML = "💗";
        heart.style.left = Math.random() * 100 + "%";
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 3000);
    }, 300);

    // BOTÃO DE COPIAR
    document.getElementById("copyBtn").onclick = () => {
        navigator.clipboard.writeText("Eu aceitei namorar contigo 💗🥹");
        alert("Mensagem copiada!");
    };
}

loadQuestion();
