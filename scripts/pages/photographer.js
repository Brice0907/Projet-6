async function main() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    console.log(parseInt(id));

    const response = await fetch('.././data/photographers.json');
    const data = await response.json();
    const user = data.photographers.find((element) => element.id === parseInt(id));
    console.log(user);

    const picture = `assets/photographers/${user.portrait}`;

    document.querySelector('.name').textContent = user.name;
    document.querySelector('.location').textContent = user.city + ', ' + user.country;
    document.querySelector('.tagline').textContent = user.tagline;
    document.querySelector('.float-tarif').textContent = user.price + '€ / jour';

    const img = document.querySelector('.portrait');
    img.setAttribute('src', picture);
    img.setAttribute('alt', user.name);
}
main()
