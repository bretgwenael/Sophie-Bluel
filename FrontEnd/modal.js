 let modal = null

const openModal = function (e) {
    e.preventDefault();
    
    // Vérifier si la cible est une ancre avec la classe .js-modal
    const target = e.target.closest('.js-modal');
    
    // Vérifier si target est null
    
        const modalId = target.getAttribute('href');
        modal = document.querySelector(modalId);
        modal.style.display = null;
        modal.removeAttribute('aria-hidden');
        modal.setAttribute('aria-modal', 'true');
        modal.querySelector('.js-modal-close').addEventListener('click', closeModal);
    }


const closeModal = function (e) {
    e.preventDefault()
    modal.style.display = 'none'
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
    modal = null
}

window.onclick = function(event) {
    if(event.target === modal) {
        modal.style.display = 'none';
    }
}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal)
})