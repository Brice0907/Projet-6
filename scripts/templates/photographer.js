function photographerTemplate(data) {
    const { name, portrait, id, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {

        const link = document.createElement('a');
        link.setAttribute('href', './photographer.html?id=' + id);
        link.setAttribute('aria-label', name);
        link.setAttribute('class', 'link');

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

        link.appendChild(img)
        link.appendChild(h2)

        article.appendChild(link);
        article.appendChild(pLocation);
        article.appendChild(pTagline);
        article.appendChild(pPrice);
        // ajouter un attr aria-label sur les liens quand je les mettraient
        return (article);
    }
    return { id, name, picture, city, country, tagline, price, getUserCardDOM }
}