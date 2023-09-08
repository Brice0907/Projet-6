async function main() {

    // On récupère l'id dans l'URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    // Puis compare l'id au données pour récupérer seulement celles qui correspondent
    const response = await fetch('.././data/photographers.json');
    const data = await response.json();
    let media = data.media.filter((el) => el.photographerId === parseInt(id));
    let mediaAffi = media.sort((a, b) => b.likes - a.likes);
    console.log(media);
    const user = data.photographers.find((element) => element.id === parseInt(id));

    // On affiche les données du photographe
    const picture = `assets/photographers/${user.portrait}`;
    document.querySelector('.name').textContent = user.name;
    document.querySelector('.location').textContent = user.city + ', ' + user.country;
    document.querySelector('.tagline').textContent = user.tagline;
    document.querySelector('.float-tarif').textContent = user.price + '€ / jour';

    const img = document.querySelector('.portrait');
    img.setAttribute('src', picture);
    img.setAttribute('alt', user.name);

    // Fonction qui permet de clear l'affichage pour le triage
    const pics = document.querySelector('.main-pics');
    const floatLike = document.querySelector('.float-like');
    function ClearAffichage() {
        pics.innerHTML = "";
        floatLike.innerHTML = "";
    }

    // Modal Trie
    const select = document.querySelector('.simple');
    select.addEventListener("change", function () {
        resetLikesCount()
        if (select.options[this.selectedIndex].value == "popularite") {
            mediaAffi.sort((a, b) => b.likes - a.likes);
        } else if (select.options[this.selectedIndex].value == "date") {
            mediaAffi.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (select.options[this.selectedIndex].value == "titre") {
            mediaAffi.sort((a, b) => a.title.localeCompare(b.title));
        }
        ClearAffichage()
        affichageMedia()
    });

    const mainAffi = document.querySelector(".main-pics");
    async function affichageMedia() {
        let likeTotal = 0
        await mediaAffi.forEach((medias, index) => {
            const photographerModel = mediaTemplate(medias, user.name, index);
            likeTotal += medias.likes;
            floatLike.innerHTML = likeTotal + '<i class="fa-solid fa-heart" aria-label="likes"></i>';
            const userCardDOM = photographerModel.getUserCardDOM();
            mainAffi.appendChild(userCardDOM);
        });
    }
    affichageMedia()

    // Modal Carousel
    const main = document.querySelector('#main');
    const header = document.querySelector('.header');
    const body = document.querySelector('.body');
    const cross = document.querySelector('.carouselClose')

    // Function d'ouverture du carousel
    window.displayModalCarousel = function displayModalCarousel(clickedIndex) {
        const modalCarousel = document.querySelector('.carousel');

        modalCarousel.style.display = 'block';
        currentIndex = clickedIndex
        updateCarousel()

        main.style.display = "none";
        header.style.display = "none";
        modalCarousel.setAttribute('aria-hidden', 'false');
        body.classList.add('no-scroll');
        cross.focus();
    }

    // Function de fermeture du carousel
    cross.addEventListener('click', () => closeModalCarousel());
    function closeModalCarousel() {
        const modalCarousel = document.querySelector('.carousel');
        modalCarousel.style.display = "none";

        main.style.display = "block";
        header.style.display = "block";
        modalCarousel.setAttribute('aria-hidden', 'true');
        body.classList.remove('no-scroll');
    }

    // Mise a jour de l'affichage de la photo/video du carousel
    let currentIndex = 0;
    function updateCarousel() {
        const carouselAffichage = document.querySelector('.carousel-affichage');
        const imageTitle = document.querySelector('.carousel-image-title');
        const currentMedia = media[currentIndex];
        // Si image sinon vidéo
        if (currentMedia.image) {
            const photo = `assets/${user.name}/${currentMedia.image}`;
            carouselAffichage.innerHTML = `<img src="${photo}" class="carousel-image" alt="${currentMedia.title}" tabindex="0"/>`;
        } else if (currentMedia.video) {
            const videoPath = `assets/${user.name}/${currentMedia.video}`;
            carouselAffichage.innerHTML = `<video class="carousel-video" controls tabindex="0"><source src="${videoPath}" type="video/mp4" alt="${currentMedia.title}"></video>`;
        }
        imageTitle.textContent = currentMedia.title;
    }
    updateCarousel()

    // Navigation pour le carousel
    const chevronLeft = document.querySelector('.fleche_right');
    chevronLeft.focus();
    chevronLeft.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    })

    const chevronRight = document.querySelector('.fleche_left');
    chevronRight.focus();
    chevronRight.addEventListener('click', () => {
        if (currentIndex < media.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    })

    // Ajout de quelques fonctionnalité au clavier pour l'acces
    window.addEventListener("keydown", function (event) {
        if (event.key == "ArrowLeft") {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        }
        if (event.key == "ArrowRight") {
            if (currentIndex < media.length - 1) {
                currentIndex++;
                updateCarousel();
            }
        }
        if (event.key == "Escape") {
            closeModalCarousel()
        }
    })

    // Information supplémentaire au form
    const modal = document.getElementById("contact_modal");
    const modalName = document.querySelector('.modal-name');

    modal.setAttribute('aria-label', "Contact me " + user.name);
    modalName.textContent = user.name;
    modalName.setAttribute('class', 'modalName');
}
main()