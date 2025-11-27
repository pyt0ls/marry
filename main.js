// Emojis diferentes para cada pergunta
const emojiThemes = [
    ["💖","✨","💕","🌸"],
    ["😳","💗","💞","🫶"],
    ["😍","🔥","💘","💓"],
    ["😂","😄","😊","😅"],
    ["🌹","🌺","🌷","💐"],
    ["🌊","🌴","☀️","🐚"],
    ["🎶","🎵","💫","⭐"],
    ["😭","😔","😳","😩"],
    ["💑","💍","❤️","💞"],
    ["💘","💖","😍","🫶"]
];

function spawnEmojis(list) {
    const layer = document.getElementById("emoji-layer");
    layer.innerHTML = ""; // limpa animação anterior

    for (let i = 0; i < 12; i++) {
        const em = document.createElement("div");
        em.classList.add("emoji");
        em.textContent = list[Math.floor(Math.random() * list.length)];

        em.style.left = Math.random() * 100 + "vw";
        em.style.animationDuration = (2.5 + Math.random() * 2) + "s";
        em.style.fontSize = (22 + Math.random() * 20) + "px";

        layer.appendChild(em);
    }
}

// Perguntas
const questions = [
    { q: "1/10 — Como você me descreveria?", options: ["Incrível 😳", "Fofo(a) ❤️", "Engraçado(a) 😂"] },
    { q: "2/10 — O que sente quando fala comigo?", options: ["Borboletas 🦋", "Felicidade ✨", "Vergonha 😳"] },
    { q: "3/10 — O quanto você gosta de mim?", options: ["Muito ❤️", "Bastante 😳", "Mais do que deveria 😅"] },
    { q: "4/10 — Você acha que combinamos?", options: ["Sim 💞", "Claro 😍", "Óbvio 🔥"] },
    { q: "5/10 — Nosso encontro perfeito seria onde?", options: ["Cinema 🎥", "Restaurante 🍝", "Em casa juntinhos 😳"] },
    { q: "6/10 — Se fôssemos viajar, pra onde iríamos?", options: ["Praia 🌊", "Hotel 🏨", "Qualquer lugar com você ❤️"] },
    { q: "7/10 — Eu te faço bem?", options: ["Sim ✨", "Com certeza 💖", "Muito 😍"] },
    { q: "8/10 — Já sentiu saudade minha?", options: ["Sim 😔", "Muita 😭", "Agora 😳"] },
    { q: "9/10 — Você acha que daríamos certo juntos?", options: ["Sim 💘", "Muito 💞", "Perfeitamente 💑"] },
    { q: "10/10 — Quer namorar comigo?", options: ["SIM ❤️", "Não 😭"], final: true }
];

let index = 0;

const card = document.getElementById("card");
const qText = document.getElementById("question");
const optBox = document.getElementById("options");

const finalScreen = document.getElementById("final-screen");
const copyBtn = document.getElementById("copyBtn");
const copied = document.getElementById("copied");

loadQuestion();

function loadQuestion() {
    const data = questions[index];
    qText.textContent = data.q;
    optBox.innerHTML = "";

    spawnEmojis(emojiThemes[index]); // ← troca animação de emojis

    data.options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.classList.add("button-normal");

        if (data.final && i === 1) {
            btn.classList.remove("button-normal");
            btn.classList.add("button-run");

            btn.addEventListener("mouseover", () => {
                const x = Math.random() * 200 - 100;
                const y = Math.random() * 200 - 100;
                btn.style.transform = `translate(${x}px, ${y}px)`;
            });

        } else {
            btn.addEventListener("click", nextQuestion);
        }

        optBox.appendChild(btn);
    });
}

function nextQuestion() {
    index++;

    if (index >= questions.length) {
        card.classList.add("hidden");
        finalScreen.classList.remove("hidden");
        spawnEmojis(["💖","💘","💞","🫶"]); // animação especial final
        return;
    }

    card.style.animation = "fadeIn 0.35s ease";
    loadQuestion();
}

// Copiar texto final
copyBtn.onclick = () => {
    const text = document.getElementById("copyText");
    text.select();
    document.execCommand("copy");
    copied.classList.remove("hidden");
    setTimeout(() => copied.classList.add("hidden"), 1500);
};
