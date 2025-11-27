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

    // PERGUNTA FINAL COM TROLL
    { q: "🔟 Agora a mais importante... você quer namorar comigo? ❤️", final: true }
];

let current = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");

// Lista de cores neon por etapa
const pageColors = [
    "#ff009d", "#ae00ff", "#009dff", "#00ffaa", "#ff7a00",
    "#ff005e", "#b300ff", "#0099ff", "#00ffea", "#ff007c"
];

function loadQuestion() {
    const qData = questions[current];

    document.getElementById("card").classList.remove("fade-in");
    void document.getElementById("card").offsetWidth;
    document.getElementById("card").classList.add("fade-in");

    document.getElementById("card").style.boxShadow = `0px 0px 22px ${pageColors[current]}`;

    questionEl.textContent = qData.q;
    optionsEl.innerHTML = "";

    // Se for a pergunta final → entra o troll
    if (qData.final) {
        const yes = document.createElement("button");
        yes.textContent = "SIM 💗";
        yes.style.background = "#ff1493";
        yes.style.color = "white";
        yes.onclick = finalScreen;
        
        const no = document.createElement("button");
        no.id = "noBtn";
        no.textContent = "NÃO 😭";
        no.style.background = "#444";
        no.style.color = "white";

        no.style.position = "relative";

        // botão de "não" que foge infinitamente
        no.onmouseover = () => {
            let x = Math.random() * 180 - 90;
            let y = Math.random() * 180 - 90;

            no.style.transform = `translate(${x}px, ${y}px)`;
        };

        optionsEl.appendChild(yes);
        optionsEl.appendChild(no);
        return;
    }

    // Perguntas normais
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

function finalScreen() {
    questionEl.textContent = "EU SABIA QUE VOCÊ IA DIZER SIM 💗🥹";
    optionsEl.innerHTML = "";
}

loadQuestion();
