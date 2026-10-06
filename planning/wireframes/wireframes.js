// Presentation controls only; no requests, storage, submission or order actions.
const notes=document.querySelector('#notes');
notes?.addEventListener('change',()=>document.body.classList.toggle('annotations-off',!notes.checked));
document.querySelectorAll('.mobile-nav a').forEach(a=>a.addEventListener('click',()=>a.closest('details').open=false));
