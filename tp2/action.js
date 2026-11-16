window.onload = () => {
    // Données envoyées par le formulaire, lues dans l'URL (?name=...&firstname=...)
    const paramsString = document.location.search;
    const searchParams = new URLSearchParams(paramsString);

    // Parcours de tous les paramètres : [identifiant du champ, valeur]
    for (const param of searchParams) {
        console.log(param);

        const elementId = param[0];
        const elementValue = param[1];
        const element = document.getElementById(elementId);

        // On ignore les paramètres qui n'ont pas d'élément correspondant dans la page
        if (element === null) {
            continue;
        }

        element.textContent = elementValue;

        if (elementId === "address") {
            // Lien vers Google Maps
            element.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(elementValue)}`;
        } else if (elementId === "email") {
            // Lien de courriel
            element.href = `mailto:${elementValue}?subject=Hello!&body=What's up?`;
        }
    }
};
