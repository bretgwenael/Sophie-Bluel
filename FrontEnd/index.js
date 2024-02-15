//initialisation variables

const gallery = document.querySelector(".gallery");
const gallery2 = document.querySelector(".gallery2");
const filters = document.querySelector(".filters");
const select = document.getElementById("selectCategories");

//fonction recuperer works depuis API

async function getWorks() {
    const response = await fetch('http://localhost:5678/api/works')
    return await response.json();
}
getWorks();

//fonction pour faire apparaitre works

async function displayWorks() {
    const works = await getWorks();
    works.forEach((work) => {
        createWorks(work);
        createModalWorks(work);
    });
}
displayWorks();

function createWorks(work) {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
        img.src = work.imageUrl;
        figcaption.textContent = work.title;

        figure.dataset.id = work.id;

        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    };

    //fonction creer gallery modale
    function createModalWorks(work) {
        const img = document.createElement("img");
        img.src = work.imageUrl;
        const icon = document.createElement("i");
        icon.id = work.id;
        icon.className = "fa-solid fa-trash-can";
        icon.addEventListener("click", function(e) {
            e.preventDefault();
            deleteWork(work.id);
        })
        const container = document.createElement("div");
        container.className = "workGallery";
        container.appendChild(img);
        container.appendChild(icon);
        gallery2.appendChild(container);
    }

    //fonction supprimer projet
    async function deleteWork(workId) {
        try {
            const token = sessionStorage.getItem("token");
    
            if (!token) {
                console.error("No token found. User is not authenticated.");
                return;
            }
    
            const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
                
            });
    
            if (response.ok) {
                // Le travail a été supprimé avec succès
                console.log(`Work with ID ${workId} deleted successfully.`);
                // Vous pouvez également mettre à jour votre interface utilisateur pour refléter la suppression, si nécessaire
                const iconToDelete = document.getElementById(workId);
            if (iconToDelete) {
                iconToDelete.parentElement.remove();

                const workInHomePage = document.querySelector(`[data-id='${token}']`)
                workInHomePage.remove();
            }
            } else {
                // Il y a eu un problème lors de la suppression du travail
                console.error(`Failed to delete work with ID ${workId}.`);
            }
        } catch (error) {
            // Une erreur s'est produite lors de la requête
            console.error('Error deleting work:', error);
        }
    }


//fonction recuperer categories depuis API

async function getCategories() {
    const response = await fetch('http://localhost:5678/api/categories')
    return await response.json();
}
getCategories();

//fonction apparaitre bouton selon categories

async function displayCategoriesButtons() {
    const categories = await getCategories();
    categories.forEach((category) => {
        const btn = document.createElement("button");
        btn.textContent = category.name;
        btn.id = category.id;
        filters.appendChild(btn);
    });

}
displayCategoriesButtons();

//fonction options selon categories

async function displayCategoriesOptions() {
    const categories = await getCategories();
    categories.forEach((category) => {
        const option = document.createElement("option");
        option.textContent = category.name;
        option.id = category.id;
        option.value = category.id;
        select.appendChild(option);
    });
}
displayCategoriesOptions();

//Filtrage au clique sur les boutons

async function filterCategories() {
    try {
        const allWorks = await getWorks();
        console.log(allWorks);
        const buttons = document.querySelectorAll(".filters button");
        buttons.forEach((button) => {
            button.addEventListener("click", async (e) => {
                try {
                    const btnId = e.target.id;
                    console.log(`Clicked button with id: ${btnId}`);
                    gallery.innerHTML = "";

                    if (btnId !== "0") {
                        const filterWorks = allWorks.filter((work) => work.categoryId == btnId);
                        console.log(filterWorks);
                        filterWorks.forEach((work) => {
                            createWorks(work);
                        });
                    } else {
                        allWorks.forEach((work) => {
                            createWorks(work);
                        });
                    }
                } catch (error) {
                    console.error("Error during filtering:", error);
                }
            });
        });
    } catch (error) {
        console.error("Error during fetching works:", error);
    }
}
filterCategories();


//Admin mode
function adminMode() {
    const token = sessionStorage.getItem("token");
  
    // Vérifier si le token existe
    if (token) {
        //retire les filtres
      document.querySelector(".filters").style.display = "none";
      //Login devient logout
      document.getElementById("logBtn").innerText = "Logout";
    // affichage modifier
    document.querySelector(".Div2").style.display = null;
    }
  }
  adminMode();

  //Sortir admin mode
  function exitAdminMode() {
    const token = sessionStorage.getItem("token"); 
    if(token) {
    const logout = document.getElementById("logBtn");
    logout.addEventListener("click", function(e) {
        e.preventDefault();
        sessionStorage.removeItem("token");
        document.querySelector(".filters").style.display = null;
        document.getElementById("logBtn").innerText = "Login";
        document.querySelector(".Div2").style.display = "none";
        window.location.replace("index.html");
        filterCategories();
    });
  }
}
  exitAdminMode();

//click bouton ajout photo

function addPictureForm() {
    const addPictureInput = document.getElementById("addPicture");
    const addPhotoDiv = document.querySelector(".addPhoto");
    const picturePreviewDiv = document.querySelector(".picturePreview");

    addPictureInput.addEventListener("change", function(e) {
        e.preventDefault();
        const file = this.files[0];
        const reader = new FileReader();

        reader.onload = function(event) {
            const img = document.createElement("img");
            img.src = event.target.result;
            picturePreviewDiv.innerHTML = "";
            picturePreviewDiv.appendChild(img);
            addPhotoDiv.style.display = 'none';
            picturePreviewDiv.style.display = null;
        };

        reader.readAsDataURL(file);
    });

    const previewPictureBtn = document.getElementById("addPictureBtn");
    previewPictureBtn.addEventListener("click", function(e) {
        e.preventDefault();
        addPictureInput.click();
    });
}
addPictureForm();


const test = document.querySelector('#formAddPicture')

test.addEventListener('submit', (e) => {
    console.log(e);
    e.preventDefault()

    const formData = new FormData();
    formData.append("title", e.target.title.value);
    formData.append("category", parseInt(e.target.selectCategories.value));
    formData.append("image", e.target.addPicture.files[0]);

    const token = sessionStorage.getItem("token");

    fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    })
    .then((response) => {
        if (response.status === 201) {
            formAddPicture.reset();
            const picturePreviewDiv = document.querySelector(".picturePreview");
            picturePreviewDiv.innerHTML = "";
            const addPhotoDiv = document.querySelector(".addPhoto");
            addPhotoDiv.style.display = null;
            picturePreviewDiv.style.display = 'none';
            gallery.innerHTML = "";
            gallery2.innerHTML = "";
            displayWorks();

            return false;
        }else if (response === 400) {
            return false;
        }else if (response === 500) {
            return false;
        }else if (response === 401) {
            window.location.href = "login.html"
        }
    })
    .catch((error) => {
        console.error("Eroor adding projects:", error);
    });
});
