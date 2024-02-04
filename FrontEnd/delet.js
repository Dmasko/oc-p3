const token = localStorage.getItem("token");

//emplacement affichage miniature

const miniatures = document.querySelector(".affichage-miniature");
//event click dans l'affichage miniature identification de l'id a supprimer

miniatures.addEventListener("click", (e) => {
  e.preventDefault();

  // Assiganation de l'Id du projet aux bouton de suppression
  if (e.target.closest(".bouton-delete")) {
    e.preventDefault();
    const emplacementClick = e.target.closest(".bouton-delete");
    const idDuBouton = emplacementClick.id;
    //declaration de la fonction suppression

    suppression(idDuBouton);
    // recuperationTravaux();
    // affichageDesMiniature();
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
      } else {
        alert("Erreur dans la suppression du projet");
      }
    })
    .catch((ERROR) => {
      alert(ERROR);
    });
}
