// Par defaut

const formulaire = document.querySelector("form");
const champsEmail = document.querySelector('input[name="email"]');
const champsMotDePasse = document.querySelector('input[name="psw"]');

// Événement se connecter

formulaire.addEventListener("submit", (event) => {
  event.preventDefault(); // Empêche l'envoi du formulaire par défaut

  const email = champsEmail.value;
  const password = champsMotDePasse.value;

  // Envoi des données d'identification à l'API pour vérification

  const response = fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    //Reponses post identification

    .then((response) => {
      //Si la réponse n'est pas ok

      if (!response.ok) {
        return response.json().then((err) => {
          throw new Error("Mauvais mot de passe ou email incorrect");
        });
      }
      return response.json();

      // message d'erreur mauvais mot de pass
    })

    .then((data) => {
      // Si data.token est retourné

      if (data.token) {
        // Stockage du token dans localstorage

        localStorage.setItem("token", data.token);

        // Redirection page d'accueil

        window.location.href = "./index.html";
      } else {
        throw new Error("Erreur lors de la connexion");
      }
    })
    .catch((error) => {
      // Afficher le message d'erreur sur la page
      const messageErreur = document.getElementById('messageErreur');
      messageErreur.textContent = error.message;
  });
});


function statutConnecte() {
  const token = localStorage.getItem("token");
  const login = document.getElementById("login");
  const filtres = document.getElementById("filtres");
  const gallery = document.getElementById("gallery");

  // Condition du statut connecté

  if (token != null) {
    // si le token n'est pas null

    //suppression de l'option Login
    login.style.display = "none";
    filtres.style.display = "none";
    gallery.style.marginTop = "70px";

    //choix de l'emplacemet de la bare de modification

    const header = document.querySelector("header");

    // invertion de l'affichage de la barre de modification et de la nav
    header.style.flexDirection = "column-reverse";
    header.style.marginTop = "0px";

    //création de la barre de modification
    const barreModification = document.createElement("div");
    barreModification.classList.add("barre-modif");

    // icone modification

    const iconeModifier = document.createElement("i");
    iconeModifier.classList = "fa-solid fa-pen-to-square";
    iconeModifier.setAttribute("id", "icone-modifier");

    // label modifier

    const labelModif = document.createElement("p");

    labelModif.innerText = "Mode édition";
    labelModif.classList.add("mode-edition");


   

    //apparition des option de modification


    const modifierProjet = document.getElementById("modifier-projets");


    modifierProjet.style.display = "block";
    modifierProjet.style.textDecoration = "none";

    //Rattachement

    header.appendChild(barreModification);
    barreModification.appendChild(iconeModifier);
    barreModification.appendChild(labelModif);
  } else {
    // si le statut n'est pas connecté

    logout.style.display = "none";
    login.style.display = "block";
  }
}

window.onload = function()
{
  const token = localStorage.getItem("token");

  if (token != null && window.location.pathname.endsWith('login.html'))  {
    window.location.replace('./index.html');
}
}


statutConnecte();

function seDeconnecter() {
  //selection de l'élement declancheur

  const logout = document.getElementById("logout");

  // Evenement au click

  logout.addEventListener("click", (e) => {
    e.preventdefault;
    deconnection();
  });
}
// Deconnection

function deconnection() {
  // suppression token du localStorage

  const actionDeconnection = localStorage.clear();

  //Rafraichissement de la page

  location.reload();
}

seDeconnecter();


