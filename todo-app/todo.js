const addBtn = document.getElementById('add-btn');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');
const progressBar = document.getElementById('progress');
const confettiCanvas = document.getElementById('confetti-canvas');
const ctx = confettiCanvas.getContext('2d');

confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

let confettiParticles = [];

function ConfettiParticle(){
  this.x = Math.random()*window.innerWidth;
  this.y = Math.random()*-window.innerHeight;
  this.size = Math.random()*8+4;
  this.color = `hsl(${Math.random()*360},100%,50%)`;
  this.speed = Math.random()*3+2;
  this.angle = Math.random()*360;
}

function drawConfetti(){
  ctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);
  confettiParticles.forEach(p=>{
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
    ctx.fill();
    p.y += p.speed;
    p.x += Math.sin(p.angle*Math.PI/180)*2;
    p.angle += 2;
    if(p.y>window.innerHeight) p.y = Math.random()*-window.innerHeight;
  });
  requestAnimationFrame(drawConfetti);
}

function triggerConfetti(){
  for(let i=0;i<100;i++){
    confettiParticles.push(new ConfettiParticle());
  }
}

drawConfetti();

function updateCount(){
  const remaining = document.querySelectorAll('.task-item:not(.completed)').length;
  taskCount.textContent = `${remaining} task${remaining !== 1 ? 's' : ''} left`;
  const total = document.querySelectorAll('.task-item').length;
  const completed = document.querySelectorAll('.task-item.completed').length;
  progressBar.style.width = total ? (completed/total*100)+'%' : '0%';
}

function createTaskItem(text){
  const li = document.createElement('li');
  li.className = 'task-item added';
  li.textContent = text;

  li.addEventListener('click', ()=>{
    li.classList.toggle('completed');
    if(li.classList.contains('completed')) triggerConfetti();
    updateCount();
  });

  const delBtn = document.createElement('button');
  delBtn.className = 'delete-btn';
  delBtn.textContent = 'X';
  delBtn.addEventListener('click',(e)=>{
    e.stopPropagation();
    li.remove();
    updateCount();
  });

  li.appendChild(delBtn);
  taskList.appendChild(li);
  taskInput.value='';
  updateCount();
}

addBtn.addEventListener('click',()=>{
  const text = taskInput.value.trim();
  if(text) createTaskItem(text);
});

taskInput.addEventListener('keypress',(e)=>{
  if(e.key==='Enter'){
    const text = taskInput.value.trim();
    if(text) createTaskItem(text);
  }
});

window.addEventListener('resize', ()=>{
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
});
