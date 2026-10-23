const names={overview:'База знаний',court:'Судебная работа',pd:'ПД',contracts:'Договорная работа'};
function showView(){
  const hash=location.hash.slice(1);
  const key=Object.hasOwn(names,hash)?hash:'overview';
  for(const name of Object.keys(names)){
    const section=document.getElementById('view-'+name);
    section.hidden=name!==key;
    section.classList.toggle('active',name===key);
  }
  for(const link of document.querySelectorAll('.nav-item')){
    const active=link.dataset.view===key;
    link.classList.toggle('active',active);
    if(active)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');
  }
  document.getElementById('crumb-current').textContent=names[key];
  window.scrollTo(0,0);
}
window.addEventListener('hashchange',showView);
showView();
