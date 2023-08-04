function photographerTemplate(data) {
    const { name, portrait, id, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute('alt', 'Photo portrait de ' + name);

        const h2 = document.createElement('h2');
        h2.textContent = name;

        const pLocation = document.createElement('p');
        pLocation.textContent = city + ', ' + country;
        pLocation.setAttribute('class', 'pLocation');

        const pTagline = document.createElement('p');
        pTagline.textContent = tagline;
        pTagline.setAttribute('class', 'pTag');

        const pPrice = document.createElement('p');
        pPrice.textContent = price + "€/jour";
        pPrice.setAttribute('class', 'pPrice');

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(pLocation);
        article.appendChild(pTagline);
        article.appendChild(pPrice);
        // ajouter un attr aria-label sur les liens quand je les mettraient
        return (article);
    }
    return { name, picture, city, country, tagline, price, getUserCardDOM }
}