const token = localStorage.getItem("token");

const miniatures = document.querySelector(".affichage-miniature");

//event click dans l'affichage miniature identification de l'id a supprimer

document.querySelector(".affichage-miniature").addEventListener("click", (e) => {
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

