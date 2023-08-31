async function main() {
    // On récupère l'id dans l'URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    // Puis compare l'id au données pour récupérer seulement celles qui correspondent
    const response = await fetch('.././data/photographers.json');
    const data = await response.json();
    const media = data.media.filter((el) => el.photographerId === parseInt(id));
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
    function ClearAffichage() {
        pics.innerHTML = "";
    }

    // Affichage des photos/vidéos du photographer
    function Affichage() {
        let nbrLikes = 0
        media.forEach((element, index) => {

            // DOM elements
            const mainDiv = document.createElement('div');
            mainDiv.setAttribute('class', 'main-div')

            const img = document.createElement('img');
            const btn = document.createElement('button');
            btn.setAttribute('aria-label', "Open carrousel");

            const photo = `assets/${user.name}/${element.image}`;

            const div = document.createElement('div');
            const text = document.createElement('p');
            const like = document.createElement('div');
            let jaime = false;

            const video = document.createElement('video');
            video.setAttribute('tabindex', "0");

            const source = document.createElement('source');
            const videoPath = `assets/${user.name}/${element.video}`;

            // Si image sinon vidéo
            if (element.image != undefined) {
                // ajout des attributs
                img.setAttribute('src', photo);
                img.setAttribute('class', 'image');
                img.setAttribute('alt', element.title + ", closeup view")
                div.setAttribute('class', 'div');
                text.textContent = element.title;

                let likes = element.likes
                like.innerHTML = likes + "<i class='fa-solid fa-heart pointer' aria-label='likes'></i>"
                // Event ouvrir le carousel
                btn.addEventListener('click', () => displayModalCarousel(index));
                // Event ajout d'un like
                like.addEventListener('click', () => liker(index))

                nbrLikes += likes;
            } else {
                // ajout des attributs
                source.setAttribute('src', videoPath);
                source.setAttribute('type', 'video/mp4');
                video.setAttribute('class', 'image');
                video.setAttribute('alt', element.title + ", closeup view")
                text.textContent = element.title;

                let likes = element.likes
                like.innerHTML = likes + "<i class='fa-solid fa-heart pointer' aria-label='likes'></i>"

                // Event ouvrir le carousel
                btn.addEventListener('click', () => displayModalCarousel(index));
                // Event ajout d'un like
                like.addEventListener('click', () => liker(index))
                nbrLikes += likes;

                video.appendChild(source);
                mainDiv.appendChild(btn);
                btn.appendChild(video);
                div.setAttribute('class', 'div');
                div.appendChild(like);
                div.appendChild(text);
            }

            // Fonction pour Like
            function liker(clickedIndex) {
                // Ajout d'un j'aime si il n'était pas like sinon on retire le j'aime
                if (jaime == false) {
                    let likes = media[clickedIndex].likes += 1;
                    like.innerHTML = likes + "<i class='fa-solid fa-heart pointer' aria-label='likes'></i>"
                    nbrLikes++;
                    document.querySelector('.float-like').innerHTML = nbrLikes + '<i class="fa-solid fa-heart" aria-label="likes"></i>';
                    jaime = true
                } else {
                    let likes = media[clickedIndex].likes -= 1;
                    like.innerHTML = likes + "<i class='fa-solid fa-heart pointer'></i>"
                    nbrLikes--;
                    document.querySelector('.float-like').innerHTML = nbrLikes + '<i class="fa-solid fa-heart" aria-label="likes"></i>';
                    jaime = false
                }
            }
            document.querySelector('.float-like').innerHTML = nbrLikes + '<i class="fa-solid fa-heart" aria-label="likes"></i>';

            pics.appendChild(mainDiv);
            mainDiv.appendChild(btn);
            btn.appendChild(img)
            mainDiv.appendChild(div);
            div.appendChild(text);
            div.appendChild(like);
        });
    }
    Affichage()

    // Modal Carousel
    const main = document.querySelector('#main');
    const header = document.querySelector('.header');
    const body = document.querySelector('.body');
    const cross = document.querySelector('.carouselClose')

    // Function d'ouverture du carousel
    function displayModalCarousel(clickedIndex) {
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

    // Modal Trie
    const select = document.querySelector('.simple');
    select.addEventListener("change", function () {

        if (select.options[this.selectedIndex].value == "popularite") {
            let trieLike = media.sort((a, b) => b.likes - a.likes);
        } else if (select.options[this.selectedIndex].value == "date") {
            let trieDate = media.sort((a, b) => b.date - a.date);
        } else if (select.options[this.selectedIndex].value == "titre") {
            let trieTitre = media.sort((a, b) => a.title.localeCompare(b.title));
        }
        ClearAffichage()
        Affichage()
    });

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
