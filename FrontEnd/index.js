//initialisation variables

const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");

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
    });
}
displayWorks();

function createWorks(work) {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
        img.src = work.imageUrl;
        figcaption.textContent = work.title;
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    };


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

// Récupération de la section existante
var existingSection = document.getElementById('portfolio');

// Création des éléments pour le reste de la structure
var outerDiv = document.createElement("div");
outerDiv.classList.add('outer');
var innerDiv1 = document.createElement("div");
innerDiv1.classList.add('Div1');
var innerDiv2 = document.createElement("div");
innerDiv2.classList.add('Div2');

var a = document.createElement("a");
a.href = "#modal";
var i = document.createElement("i");
i.classList.add('fa-regular', 'fa-pen-to-square');
var p = document.createElement("p");
p.innerText = 'modifier';

// Assemblage de la nouvelle structure
a.appendChild(i);
a.appendChild(p);
innerDiv2.appendChild(a);

// Ajout du h2 existant dans innerDiv1
var existingH2 = existingSection.querySelector('h2');
innerDiv1.appendChild(existingH2);

outerDiv.appendChild(innerDiv1);
outerDiv.appendChild(innerDiv2);

// Ajout de la nouvelle structure avant la div avec la classe "filters"
existingSection.insertBefore(outerDiv, existingSection.querySelector('.filters'));
    
    }
  }
  
  adminMode();


  //modal

