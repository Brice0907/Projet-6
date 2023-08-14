async function main() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const response = await fetch('.././data/photographers.json');
    const data = await response.json();
    const media = data.media.filter((el) => el.photographerId === parseInt(id));
    console.log(media);
    const user = data.photographers.find((element) => element.id === parseInt(id));

    const picture = `assets/photographers/${user.portrait}`;

    document.querySelector('.name').textContent = user.name;
    document.querySelector('.location').textContent = user.city + ', ' + user.country;
    document.querySelector('.tagline').textContent = user.tagline;
    document.querySelector('.float-tarif').textContent = user.price + '€ / jour';


    const img = document.querySelector('.portrait');
    img.setAttribute('src', picture);
    img.setAttribute('alt', user.name);

    const pics = document.querySelector('.main-pics');
    let nbrLikes = 0
    media.forEach((element, index) => {

        nbrLikes += element.likes;
        const mainDiv = document.createElement('div');
        mainDiv.setAttribute('class', 'main-div')

        const img = document.createElement('img');
        const photo = `assets/${user.name}/${element.image}`;
        const div = document.createElement('div');
        const text = document.createElement('p');
        const like = document.createElement('div');

        const video = document.createElement('video');
        const source = document.createElement('source');
        const videoPath = `assets/${user.name}/${element.video}`;
        if (element.image != undefined) {

            img.setAttribute('src', photo);
            img.setAttribute('class', 'image');
            img.addEventListener('click', () => displayModalCarousel(index));
            div.setAttribute('class', 'div');

            text.textContent = element.title;
            like.innerHTML = element.likes + "<i class='fa-solid fa-heart'></i>"
        } else {

            source.setAttribute('src', videoPath);
            source.setAttribute('type', 'video/mp4');
            video.setAttribute('class', 'image');
            video.addEventListener('click', () => displayModalCarousel(index));

            video.appendChild(source);
            mainDiv.appendChild(video);

            like.innerHTML = element.likes + "<i class='fa-solid fa-heart'></i>"
            text.textContent = element.title;
            div.setAttribute('class', 'div');
            // video.controls = true; à mettre dans le slide show
            div.appendChild(like);
            div.appendChild(text);
        }

        pics.appendChild(mainDiv);
        mainDiv.appendChild(img);
        mainDiv.appendChild(div);
        div.appendChild(text);
        div.appendChild(like);
    });
    document.querySelector('.float-like').innerHTML = nbrLikes + '<i class="fa-solid fa-heart"></i>';

    const modalName = document.querySelector('.modal-name');
    modalName.textContent = user.name;
    modalName.setAttribute('class', 'modalName');

    // Modal Carousel

    function displayModalCarousel(clickedIndex) {
        const modalCarousel = document.querySelector('.carousel');
        modalCarousel.style.display = 'block';
        currentIndex = clickedIndex
        updateCarousel()
    }

    const cross = document.querySelector('.carouselClose')
    cross.addEventListener('click', () => closeModalCarousel());
    function closeModalCarousel() {
        const modalCarousel = document.querySelector('.carousel');
        modalCarousel.style.display = "none";
    }

    const chevronLeft = document.querySelector('.fa-chevron-left');
    const chevronRight = document.querySelector('.fa-chevron-right');

    let currentIndex = 0;

    function updateCarousel() {
        const test = document.querySelector('.carousel-affichage');
        const imageTitle = document.querySelector('.carousel-image-title');

        const currentMedia = media[currentIndex];

        if (currentMedia.image) {
            const photo = `assets/${user.name}/${currentMedia.image}`;
            test.innerHTML = `<img src="${photo}" class="carousel-image" />`;
        } else if (currentMedia.video) {
            const videoPath = `assets/${user.name}/${currentMedia.video}`;
            test.innerHTML = `<video class="carousel-video" controls><source src="${videoPath}" type="video/mp4"></video>`;
        }

        imageTitle.textContent = currentMedia.title;
    }
    updateCarousel()

    chevronLeft.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    })
    chevronRight.addEventListener('click', () => {
        if (currentIndex < media.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    })

}
main()
