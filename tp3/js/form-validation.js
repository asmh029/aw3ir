// Fonction de validation d'email
function validateEmail(email) {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Protège le texte saisi avant de l'insérer dans du HTML
function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

// Affiche la modal avec un titre et un contenu HTML
function showModal(title, bodyHtml) {
    document.querySelector(".modal-title").textContent = title;
    document.querySelector(".modal-body").innerHTML = bodyHtml;
    const myModal = new bootstrap.Modal(document.getElementById("myModal"));
    myModal.show();
}

// Marque un champ comme valide / invalide (classes Bootstrap)
function setValidity(selector, isValid) {
    const input = document.querySelector(selector);
    input.classList.toggle("is-invalid", !isValid);
    input.classList.toggle("is-valid", isValid);
}

window.onload = function () {
    // ce code est exécuté une fois que toute la page est téléchargée par le navigateur
    console.log("DOM ready!");

    document.querySelector("form").addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.querySelector("#name").value.trim();
        const firstname = document.querySelector("#firstname").value.trim();
        const birthday = document.querySelector("#birthday").value;
        const address = document.querySelector("#address").value.trim();
        const email = document.querySelector("#email").value.trim();

        const errors = [];

        // Champs texte : 5 caractères minimum
        const nameOk = name.length >= 5;
        const firstnameOk = firstname.length >= 5;
        const addressOk = address.length >= 5;
        if (!nameOk) errors.push("Le nom doit contenir au moins 5 caractères.");
        if (!firstnameOk) errors.push("Le prénom doit contenir au moins 5 caractères.");
        if (!addressOk) errors.push("L'adresse postale doit contenir au moins 5 caractères.");

        // Date de naissance : renseignée et pas dans le futur
        let birthdayOk = false;
        if (birthday === "") {
            errors.push("La date de naissance est obligatoire.");
        } else {
            const birthdayTimestamp = new Date(birthday).getTime();
            const nowTimestamp = Date.now();
            if (birthdayTimestamp > nowTimestamp) {
                errors.push("La date de naissance ne peut pas être dans le futur.");
            } else {
                birthdayOk = true;
            }
        }

        // Email bien formaté
        const emailOk = validateEmail(email);
        if (!emailOk) errors.push("L'adresse mail n'est pas valide.");

        // Retour visuel sur chaque champ
        setValidity("#name", nameOk);
        setValidity("#firstname", firstnameOk);
        setValidity("#birthday", birthdayOk);
        setValidity("#address", addressOk);
        setValidity("#email", emailOk);

        if (errors.length > 0) {
            // Modal d'erreur : au moins un champ est incorrect
            const list = errors.map((e) => `<li>${escapeHtml(e)}</li>`).join("");
            showModal("Formulaire incorrect", `<ul class="mb-0">${list}</ul>`);
        } else {
            // Modal de succès : lien vers Google Maps avec l'adresse saisie
            const mapsUrl = `http://maps.google.com/maps?q=${encodeURIComponent(address)}`;
            showModal(
                "Formulaire valide",
                `<p>Bonjour ${escapeHtml(firstname)} ${escapeHtml(name)},</p>
                 <p class="mb-0">Voir votre adresse sur Google Maps :
                 <a href="${mapsUrl}" target="_blank">${escapeHtml(address)}</a></p>`
            );
        }
    });
};
