const overlay = document.querySelector(".modales");

function affichageDesMiniature() {
  const miniatures = document.getElementById("affichage-miniature");
  miniatures.innerHTML = "";
  // Récupération elements du tableau travaux de l'API
  fetch("http://localhost:5678/api/works")
    .then((reponse) => reponse.json())
    .then((projets) => {
      //informations fonctionnement affichage

      for (let i = 0; i < projets.length; i++) {
        const elements = projets[i];

        //Condition d'affichage
        if (elements !== null) {
          // Création de l'affiçchage miniature

          // construction fiche miniature

          const ficheMiniature = document.createElement("div");
          ficheMiniature.classList.add("fiche-miniature");

          const icones = document.createElement("div");
          icones.classList.add("icones-fiche-miniature");



          // creation du boutton de suppression
          const boutonSuprimmer = document.createElement("button");
          boutonSuprimmer.classList.add("bouton-delete");
          boutonSuprimmer.setAttribute("id", elements.id);

          // creation de l'icône poubelle
          const iconeEffacer = document.createElement("i");
          iconeEffacer.classList = "fa-solid fa-trash-can";
          iconeEffacer.style.color = "#ffffff";
          iconeEffacer.style.backgroundColor = "black";

          // création et importation image
          const image = document.createElement("img");
          image.src = elements.imageUrl;
          image.classList.add = "image-miniature";


          //rattahement
          icones.appendChild(boutonSuprimmer);
          boutonSuprimmer.appendChild(iconeEffacer);
          ficheMiniature.appendChild(icones);
          ficheMiniature.appendChild(image);
          miniatures.appendChild(ficheMiniature);
        }
      }
    });
}
affichageDesMiniature();

// ouvrir et fermer modale1

function ouvrirModale1() {
  const modale1 = document.getElementById("modale1");
  modale1.style.display = "block";
  modale1.removeAttribute("aria-hidden");
  modale1.setAttribute("aria-modal", true);
}

function fermerModale1() {
  modale1.style.display = "none";
  modale1.removeAttribute("aria-hidden");
  modale1.setAttribute("aria-modale", true);
}

//ouvrir fermer modale2

function ouvrirModale2() {
  modale2.style.display = "Block";
  modale2.removeAttribute("aria-hidden");
  modale2.setAttribute("aria-modal", true);
}

function fermerModale2() {
  const modale2 = document.getElementById("modale2");
  modale2.style.display = "none";
  modale2.removeAttribute("aria-modale");
  modale2.setAttribute("aria-hidden", true);
}

//  Le clique sur Modifier Ouvre la modale 1

function modifcationProjets() {
  const modifierProjets = document.getElementById("modifier-projets");
  modifierProjets.addEventListener("click", (e) => {
    e.preventDefault;
    ouvrirModale1();
    overlay.style.display = "block";
  });
}

// Le bouton Ajouter une photo Ouvre la modale 2 et ferme la modale 1

function ajouterPhoto() {
  const boutonAjouterPhotoModale1 = document.getElementById("validation");
  boutonAjouterPhotoModale1.addEventListener("click", (e) => {
    e.preventDefault;
    ouvrirModale2();
    fermerModale1();
    overlay.style.display = "block";
  });
}

// Le bouton fermer modale 1

function boutonFermerModale1() {
  const boutonFermerModale1 = document.getElementById("fermer-modale1");
  boutonFermerModale1.addEventListener("click", (e) => {
    e.preventDefault;
    fermerModale1();
    overlay.style.display = "none";
  });
}

// le bouton retour de la modale 2 ferme la modale 2 et ouvre la modale 1

function boutonRetourModale2() {
  const boutonRetour = document.getElementById("retour");
  boutonRetour.addEventListener("click", (e) => {
    e.preventDefault;
    fermerModale2();
    ouvrirModale1();
    overlay.style.display = "block";
  });
}

// le bouton fermer de la modale 2 ferme la modale 2

function boutonFermerModale2() {
  const boutonFermerModale2 = document.getElementById("fermer-modale2");
  boutonFermerModale2.addEventListener("click", (e) => {
    e.preventDefault;
    fermerModale2();
    overlay.style.display = "none";
  });
}

// fermeture au click en dehors de la modale
document.onclick = (event) => {

  if (event.target == overlay) {
    fermerModale1();
    fermerModale2();
    overlay.style.display = "none";
  }
};

modifcationProjets();
boutonFermerModale1();
ajouterPhoto();
boutonRetourModale2();
boutonFermerModale2();


const miniatures = document.querySelector(".affichage-miniature");

//event click dans l'affichage miniature identification de l'id a supprimer

document.querySelector(".affichage-miniature").addEventListener("click", (e) => {
  e.preventDefault();
  const deleteButton = e.target.closest(".bouton-delete");
  
  if (deleteButton) {
    e.preventDefault();
    const ficheMiniature = deleteButton.closest(".fiche-miniature");
    const imageUrl = ficheMiniature.querySelector('img').src;

    ficheMiniature.remove();
    document.querySelectorAll('.gallery img').forEach(galerieImage => {
      if (galerieImage.src === imageUrl) {
        galerieImage.parentElement.remove();
      }
    });

    suppression(deleteButton.id);
  }
});

// Reqète de supression API

function suppression(idDuBouton) {

  fetch(`http://localhost:5678/api/works/${idDuBouton}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    
      "Content-Type": "application/json",
    },
  })
    .then((reponse) => {
      if (reponse.status == 204) {
        console.log("Suppression du Projet");
        window.stop();
      } else {
        alert("Erreur dans la suppression du projet");
      }
    })
    .catch((ERROR) => {
      alert(ERROR);
    });
}
