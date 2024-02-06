// Catégorie de filtrage
const token = localStorage.getItem("token");



function recuperationTravaux(filtre = "tous") {
  /*le parametre de la fonction recuperationTravaux indique 
  l'affichage de filtre tous est l'affichage par defaut*/

  // Récupération elements du tableau travaux de l'API

  fetch("http://localhost:5678/api/works")
    .then((reponse) => reponse.json())
    .then((travaux) => {
      // informations fonctionnement affichage

      if (filtre == "tous") {
        affichage(travaux);

        // information d'affichage filtrer
      } else {
        const filtrage = travaux.filter(function (afichageFiltrer) {
          return afichageFiltrer.category.name === filtre;
        });

        //appel de la fonction affichage avec fitrage pour argument

        affichage(filtrage);
      }
    });
}


// Appel de la fonction recuperation des travaux

recuperationCategories();

// Appel de la fonction d'affichage par defaut

recuperationTravaux();





function recuperationCategories() {
  // Récupération des catégories de l'API (fetch GET)


 
  fetch("http://localhost:5678/api/categories")
    .then((reponse) => reponse.json())
    .then((category) => {
      categoriesFiltres = category;

      // Choix de l'emplacement parent

      const sectionFiltres = document.querySelector(".filtres");

      // Création du bouton filtre tous

      const boutonTous = document.createElement("button");
      boutonTous.classList.add("boutonTous");
      boutonTous.innerText = "Tous";

      // Rattachement du bouton

      sectionFiltres.appendChild(boutonTous);

      // Evenement au clique

      boutonTous.addEventListener("click", (e) => {
        e.preventDefault();
        recuperationTravaux();
      });

      // assignation des catégories au boutons filtres

      for (let i = 0; i < category.length; i++) {
        const categories = category[i];

        // creation boutons filtres

        const boutonsFiltres = document.createElement("button");
        boutonsFiltres.classList.add("boutonsFiltres");
        boutonsFiltres.innerText = categories.name;
        sectionFiltres.appendChild(boutonsFiltres);

        // evenement click

        boutonsFiltres.addEventListener("click", (e) => {
          e.preventDefault();
          recuperationTravaux(categories.name);
        });
      }
    });
}

function affichage(elementsGalerie) {
  // Choix de l'emplacement parent (balise qui accueui les fiches)

  const sectionAffichage = document.querySelector(".gallery");

  // rafraichissement affichage
  sectionAffichage.innerHTML = "";

  // boucle sur les elements a afficher
  for (let i = 0; i < elementsGalerie.length; i++) {
    const articleGalerie = elementsGalerie[i];

    // Création de l'affiçchage de la galerie par defaut

    const fiche = document.createElement("div");
    fiche.classList.add("fiche");
    const image = document.createElement("img");

    //l'url de l'image correspond a la clé imageURL dans l'API
    image.src = articleGalerie.imageUrl;

    const titre = document.createElement("p");
    //le titre corespond a la clé title de l'API
    titre.innerText = articleGalerie.title;

    //Rattachement des elements

    sectionAffichage.appendChild(fiche);
    fiche.appendChild(image);
    fiche.appendChild(titre);
  }
}



const prevImage = document.createElement("img");
const iconeImage = document.getElementById("icone-image");
// Prévisualisation de l'image selectionnée
function previewPictrure() {
  const sectionPrev = document.getElementById("image-prev");
  const inputImage = document.getElementById("selectioner");

  // evenement change pour acceder a l'input file

  inputImage.addEventListener("change", (e) => {
    iconeImage.style.display = "none";
    sectionPrev.innerHTML = "";

    //création de la prévisualisation

    prevImage.classList.add("imagePrevisualise");
    let selectionFichier = document.getElementById("selectioner").files[0];
    const maxSize = 4 * 1024 * 1024;
    if (selectionFichier.size > maxSize) {
      alert("Fichier trop volumineux");
      iconeImage.style.display = "block";
      return;
    }


    //création et assigantion de l'url du fichier a l'image
    
    const urlObjet = URL.createObjectURL(selectionFichier);
    prevImage.src = urlObjet;
    sectionPrev.appendChild(prevImage);
  });
}
previewPictrure();
// affichage(inputImage);




function validationFormulaire() {
  //Capture de l'élément seléctionné

  let selectionFichier = document.getElementById("selectioner").files[0];

  // Valeure du champs titre

  const titre = document.getElementById("titre").value;

  // valeur du champs catégorie

  const categorie = document.getElementById("liste-categories").value;

  //Condition de validation gestion des erreurs
  console.log(selectionFichier);
  if (selectionFichier == undefined) {
    alert("Veuillez choisir une image");
    return;
  }
  if (titre == "") {
    alert("Veuillez définir un titre");
    return;
  }
  if (categorie == "Champs-selection") {
    alert("Veuillez selectionner une catégorie");
    return;
  }

  // Création FormData avec les éléments du formulaire

  let formData = new FormData();
  formData.append("image", selectionFichier);
  formData.append("title", titre);
  formData.append("category", categorie);

  // Envoie FormData dans la requète poste

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
      body: formData,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("erreur lors du transfert");
    })
    .then((data) => {
      // fermerModale2();
      document.querySelector(".formulaire-ajout").reset();
      prevImage.remove();
      iconeImage.style.display = "block";
      affichageDesMiniature();
      recuperationTravaux();
      fermerModale2();
      ouvrirModale1();
    })
    .catch((error) => {
      console.error(error);
    });
}

//Validation et vérification formulaire
const valider = document.getElementById("valider-modale2");



valider.addEventListener("click", (e) => {
  validationFormulaire();

});



// Evenement de validation du formulaire







function cancel(){
  const cancel = document.getElementById("cancel");
  const msgcontact = document.getElementById("msgcontact");
  cancel.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Le formulaire ne fonctionne pas");
  msgcontact.style.display = "block";
  msgcontact.innerHTML = "Le formulaire ne fonctionne pas";
  })}
  
  cancel();
  function validateemail()
  {
    const emailcontact = document.getElementById("emailcontact");
    if(!emailcontact.value.match(/^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/))
    {
      msgcontact.style.display = "block";
      msgcontact.innerHTML = "Veuillez saisir une adresse mail valide";
      // alert("Veuillez saisir une adresse mail valide");
      return false;
    }
    msgcontact.innerHTML = "";
    return true;
  }
  