/* ===== dados das perguntas (10) ===== */
const questions = [
  { q: "1/10 — Como você me descreveria?", opts: ["Incrível 😳","Fofo(a) ❤️","Engraçado(a) 😂"] },
  { q: "2/10 — O que você sente quando fala comigo?", opts: ["Borboletas 🦋","Felicidade ✨","Vergonha 😳"] },
  { q: "3/10 — O quanto você gosta de mim?", opts: ["Muito ❤️","Bastante 😳","Mais do que deveria 😅"] },
  { q: "4/10 — Você acha que combinamos?", opts: ["Sim 💞","Claro 😍","Óbvio 🔥"] },
  { q: "5/10 — Nosso encontro perfeito seria onde?", opts: ["Cinema 🎥","Restaurante 🍝","Piquenique 🌸"] },
  { q: "6/10 — Se fôssemos viajar, pra onde iríamos?", opts: ["Praia 🌊","Montanha ⛰️","Cidade grande 🌆"] },
  { q: "7/10 — Eu te faço bem?", opts: ["Sim ✨","Com certeza 💖","Muito 😍"] },
  { q: "8/10 — Já sentiu saudade minha?", opts: ["Sim 😔","Muita 😭","Agora 😳"] },
  { q: "9/10 — Você acha que daríamos certo juntos?", opts: ["Sim 💘","Muito 💞","Perfeitamente 💑"] },
  { q: "10/10 — Quer namorar comigo?", opts: ["SIM ❤️","NÃO 😭"], final: true }
];

/* ===== theme emojis por pergunta (para o layer) ===== */
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

let idx = 0;

/* elementos */
const card = document.getElementById('card');
const questionEl = document.getElementById('question');
const subtitleEl = document.getElementById('subtitle');
const optionsEl = document.getElementById('options');
const optionsWrapper = document.getElementById('optionsWrapper');
const stageFill = document.getElementById('stageFill');

const finalScreen = document.getElementById('final-screen');
const copyText = document.getElementById('copyText');
const copyBtn = document.getElementById('copyBtn');
const copied = document.getElementById('copied');

const emojiLayer = document.getElementById('emoji-layer');

/* ==== util: limpa e gera emojis na camada ==== */
function spawnEmojis(list, count = 10){
  emojiLayer.innerHTML = '';
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

  for(let i=0;i<count;i++){
    const e = document.createElement('div');
    e.className = 'emoji';
    e.textContent = list[Math.floor(Math.random()*list.length)];
    // random start x, start beyond bottom
    const left = Math.random() * (vw - 40);
    e.style.left = (left) + 'px';
    // random size
    e.style.fontSize = (18 + Math.random()*26) + 'px';
    // random duration
    const dur = 3 + Math.random()*3;
    e.style.animationDuration = dur + 's';
    // slight horizontal jitter by translate on animation (css handles vertical)
    emojiLayer.appendChild(e);
    // give each emoji a slight staggered start
    e.style.opacity = 0;
    setTimeout(()=> e.style.opacity = 1, i*80);
    // remove after full animation (safety)
    setTimeout(()=> e.remove(), (dur+0.6)*1000);
  }
}

/* ==== atualiza barra de progresso ==== */
function updateStage(){
  const pct = (idx/(questions.length-1))*100;
  stageFill.style.width = pct + '%';
}

/* ==== carregar questão atual ==== */
function loadQuestion(){
  const q = questions[idx];

  // animação do painel (reflow to restart)
  card.classList.remove('panel');
  void card.offsetWidth;
  card.classList.add('panel');

  // spawn emojis temáticos
  spawnEmojis(emojiThemes[idx], 12);

  questionEl.textContent = q.q;
  subtitleEl.textContent = `Pergunta ${idx+1} de ${questions.length}`;
  optionsEl.innerHTML = '';

  updateStage();

  // se for final, cria SIM + NÃO com comportamento especial
  if(q.final){
    // SIM button
    const btnYes = document.createElement('button');
    btnYes.className = 'btn primary';
    btnYes.textContent = q.opts[0];
    btnYes.onclick = handleYes;
    // NÃO button (movable)
    const btnNo = document.createElement('button');
    btnNo.className = 'btn ghost';
    btnNo.textContent = q.opts[1];

    // colocamos btnNo como absolute dentro do optionsWrapper to limit movement
    // first, append as normal to get size / layout
    optionsEl.appendChild(btnYes);
    optionsEl.appendChild(btnNo);

    // small gap and center
    // ensure optionsWrapper is positioned to allow absolute placement
    optionsWrapper.style.position = 'relative';
    btnNo.style.position = 'absolute';
    btnNo.style.left = 'calc(50% + 90px)'; // initial pos
    btnNo.style.top = '0px';
    btnNo.classList.add('movable');

    // MOVE logic: compute available bounding inside optionsWrapper
    function moveNo(){
      const parentRect = optionsWrapper.getBoundingClientRect();
      const btnRect = btnNo.getBoundingClientRect();
      const pad = 8;
      const maxX = Math.max(parentRect.width - btnRect.width - pad, pad);
      const maxY = Math.max(parentRect.height - btnRect.height - pad, pad);
      // pick coords inside parent
      const x = Math.random() * maxX;
      const y = Math.random() * maxY;
      btnNo.style.left = x + 'px';
      btnNo.style.top = y + 'px';
    }

    // attach events for mouse and touch
    btnNo.addEventListener('mouseover', moveNo);
    btnNo.addEventListener('click', (e)=> { e.preventDefault(); moveNo(); });
    btnNo.addEventListener('touchstart', (e)=> { e.preventDefault(); moveNo(); });

    // ensure yes is centered nicely
    btnYes.style.marginBottom = '6px';
    btnYes.style.maxWidth = '260px';
    btnYes.style.width = '60%';

    return;
  }

  // perguntas normais: cria botões para cada opção (todos clicáveis)
  q.opts.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'btn primary';
    btn.textContent = opt;
    btn.onclick = ()=>{
      // avança
      idx++;
      if(idx >= questions.length) showFinal();
      else loadQuestion();
    };
    optionsEl.appendChild(btn);
  });
}

/* ==== quando clica SIM no final ==== */
function handleYes(){
  showFinal();
}

/* ==== mostra tela final ==== */
function showFinal(){
  document.getElementById('card').style.display = 'none';
  finalScreen.classList.add('visible');
  finalScreen.classList.remove('hidden');

  // spawn celebration emojis continuously for um tempo
  let bursts = 0;
  const interval = setInterval(()=>{
    spawnEmojis(["💗","🎉","✨","💘"], 8);
    bursts++;
    if(bursts > 18) clearInterval(interval);
  }, 180);

  // copiar
  copyBtn.onclick = ()=>{
    copyText.select();
    try {
      document.execCommand('copy');
      copied.classList.remove('hidden');
      setTimeout(()=>copied.classList.add('hidden'),1400);
    } catch(e){
      alert('Não foi possível copiar automaticamente — selecione e copie manualmente.');
    }
  };
}

/* ==== init ==== */
window.addEventListener('load', ()=> {
  // initial small delay so styles settle
  setTimeout(()=> loadQuestion(), 120);
});

/* recompute stage on resize to keep width correct */
window.addEventListener('resize', updateStage);
