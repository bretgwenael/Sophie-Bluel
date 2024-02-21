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
    e.preventDefault();
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    modal.querySelectorAll('.js-modal-close').forEach(element => {
        element.removeEventListener('click', closeModal);
    });
    modal = null
    window.location.reload("index.html");
}

function previousModal() {
    const leftArrow = document.querySelector('.fa-solid.fa-arrow-left');
    leftArrow.addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector(".modal-wrapper2").style.display = 'none';
        document.querySelector(".modal-wrapper1").style.display = null;
    });
    }
    previousModal();

    function addPictureModal () {
        const addPictureBtn = document.querySelector('.btnAddPicture');
        addPictureBtn.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(".modal-wrapper2").style.display = null;
            document.querySelector(".modal-wrapper1").style.display = 'none';
        });
    }
    addPictureModal();

window.onclick = function(event) {
    if(event.target === modal) {
        modal.style.display = 'none';
        window.location.reload("index.html");
    }
}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal)
})

document.querySelectorAll('.js-modal-close').forEach(a => {
    a.addEventListener('click', closeModal)
})
