const openBtn=document.getElementById('openBtn');
const welcome=document.getElementById('welcome');
const videoScreen=document.getElementById('videoScreen');
const introVideo=document.getElementById('introVideo');
const playVideoBtn=document.getElementById('playVideoBtn');
const skipVideo=document.getElementById('skipVideo');
const experience=document.getElementById('experience');
const cover=document.getElementById('cover');
const photoPage=document.getElementById('photoPage');
const nextPageBtn=document.getElementById('nextPageBtn');
const music=document.getElementById('bgMusic');
const musicBtn=document.getElementById('musicBtn');
const typed=document.getElementById('typedText');
const signature=document.getElementById('signature');
let typingStarted=false;
let bookStarted=false;

// CAMBIA AQUÍ EL TEXTO DE TU CARTA 💜
const letter=`Quiero que sepas lo especial que eres para mí y lo feliz que me hace poder verte crecer, aprender y convertirte poco a poco en una personita increíble.\n\nDeseo que siempre tengas muchísimos motivos para sonreír, que nunca te falten sueños por cumplir y que recuerdes que eres capaz de conseguir cosas maravillosas.\n\nEspero poder acompañarte en muchos momentos de tu vida, celebrar tus logros, apoyarte cuando lo necesites y recordarte siempre lo mucho que vales.\n\nNunca dejes de ser tú, de disfrutar las pequeñas cosas, de reír muchísimo y de llenar de alegría a las personas que te queremos.\n\nNo importa cuánto crezcas, para mí siempre vas a ser una personita muy especial.`;

// 1) Al presionar el botón inicial se muestra el video.
openBtn.addEventListener('click',()=>{
  welcome.classList.add('hide');
  videoScreen.classList.add('show');
  videoScreen.setAttribute('aria-hidden','false');

  // Como viene de un clic del usuario, intentamos reproducirlo de inmediato.
  introVideo.play().then(()=>{
    playVideoBtn.textContent='❚❚ Pausar';
  }).catch(()=>{
    playVideoBtn.textContent='▶ Reproducir';
  });
});

// Botón manual por si el navegador no inicia el video automáticamente.
playVideoBtn.addEventListener('click',()=>{
  if(introVideo.paused){
    introVideo.play().catch(()=>{});
    playVideoBtn.textContent='❚❚ Pausar';
  }else{
    introVideo.pause();
    playVideoBtn.textContent='▶ Reproducir';
  }
});

introVideo.addEventListener('play',()=>playVideoBtn.textContent='❚❚ Pausar');
introVideo.addEventListener('pause',()=>{
  if(!introVideo.ended) playVideoBtn.textContent='▶ Reproducir';
});

// 2) Cuando termina el video, aparece el libro y comienza la música.
introVideo.addEventListener('ended',startBookExperience);
skipVideo.addEventListener('click',startBookExperience);

function startBookExperience(){
  if(bookStarted)return;
  bookStarted=true;

  introVideo.pause();
  videoScreen.classList.add('hide');
  videoScreen.classList.remove('show');
  videoScreen.setAttribute('aria-hidden','true');

  experience.classList.add('show');
  experience.setAttribute('aria-hidden','false');

  music.play().then(()=>{
    musicBtn.textContent='♫ Pausar';
  }).catch(()=>{
    musicBtn.textContent='♫ Música';
  });

  confetti();
  setTimeout(()=>cover.classList.add('open'),650);
}

nextPageBtn.addEventListener('click',()=>{
  photoPage.classList.add('turned');
  confetti();
  setTimeout(typeLetter,900);
});

musicBtn.addEventListener('click',()=>{
  if(music.paused){music.play().catch(()=>{});musicBtn.textContent='♫ Pausar';}
  else{music.pause();musicBtn.textContent='♫ Música';}
});

function typeLetter(){
  if(typingStarted)return; typingStarted=true;
  let i=0; typed.textContent='';
  const timer=setInterval(()=>{
    typed.textContent+=letter.charAt(i); i++;
    if(i>=letter.length){clearInterval(timer);signature.classList.add('show');}
  },24);
}
function confetti(){const chars=['💜','✨','❀','♡','✦','🌸'];for(let i=0;i<75;i++){const e=document.createElement('span');e.className='confetti';e.textContent=chars[Math.floor(Math.random()*chars.length)];e.style.left=Math.random()*100+'vw';e.style.fontSize=(10+Math.random()*17)+'px';e.style.animationDuration=(2.5+Math.random()*3)+'s';e.style.animationDelay=Math.random()*.7+'s';document.body.appendChild(e);setTimeout(()=>e.remove(),6500)}}
function floating(){const chars=['♡','✦','❀','💜','✨'];const box=document.getElementById('particles');setInterval(()=>{const e=document.createElement('span');e.className='particle';e.textContent=chars[Math.floor(Math.random()*chars.length)];e.style.left=Math.random()*100+'vw';e.style.fontSize=(11+Math.random()*15)+'px';e.style.animationDuration=(7+Math.random()*6)+'s';box.appendChild(e);setTimeout(()=>e.remove(),13500)},650)}
function sparkles(){for(let i=0;i<25;i++){const s=document.createElement('span');s.className='spark';s.textContent='✦';s.style.left=Math.random()*100+'vw';s.style.top=Math.random()*100+'vh';s.style.fontSize=(7+Math.random()*9)+'px';s.style.animationDelay=Math.random()*2+'s';s.style.opacity=.45;document.body.appendChild(s)}}
floating();sparkles();
