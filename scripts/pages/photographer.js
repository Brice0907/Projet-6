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
    function ClearAffichage() {
        pics.innerHTML = ""
    }

    let nbrLikes = 0
    function Affichage() {
        media.forEach((element, index) => {

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
            if (element.image != undefined) {

                img.setAttribute('src', photo);
                img.setAttribute('class', 'image');
                img.setAttribute('alt', "Lilac breasted roller, closeup view")
                btn.addEventListener('click', () => displayModalCarousel(index));
                div.setAttribute('class', 'div');

                text.textContent = element.title;

                let likes = element.likes
                like.innerHTML = likes + "<i class='fa-solid fa-heart pointer' aria-label='likes'></i>"
                like.addEventListener('click', () => liker(index))
                nbrLikes += likes;

            } else {

                source.setAttribute('src', videoPath);
                source.setAttribute('type', 'video/mp4');
                video.setAttribute('class', 'image');
                video.setAttribute('alt', "Lilac breasted roller, closeup view")
                btn.addEventListener('click', () => displayModalCarousel(index));

                video.appendChild(source);
                mainDiv.appendChild(btn);
                btn.appendChild(video);

                let likes = element.likes
                like.innerHTML = likes + "<i class='fa-solid fa-heart pointer' aria-label='likes'></i>"
                like.addEventListener('click', () => liker(index))
                nbrLikes += likes;

                text.textContent = element.title;
                div.setAttribute('class', 'div');
                div.appendChild(like);
                div.appendChild(text);
            }

            // Fonction pour Like
            function liker(clickedIndex) {
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
    const modal = document.getElementById("contact_modal");
    modal.setAttribute('aria-label', "Contact me " + user.name);
    const modalName = document.querySelector('.modal-name');
    modalName.textContent = user.name;
    modalName.setAttribute('class', 'modalName');

    // Modal Carousel
    const main = document.querySelector('#main');
    const header = document.querySelector('.header');
    const body = document.querySelector('.body');
    const cross = document.querySelector('.carouselClose')

    function displayModalCarousel(clickedIndex) {
        const modalCarousel = document.querySelector('.carousel');

        modalCarousel.style.display = 'block';
        currentIndex = clickedIndex
        updateCarousel()

        main.setAttribute('aria-hidden', "true");
        header.setAttribute('aria-hidden', "true");
        modalCarousel.setAttribute('aria-hidden', 'false');
        body.classList.add('no-scroll');
        cross.focus();
    }

    cross.addEventListener('click', () => closeModalCarousel());
    function closeModalCarousel() {
        const modalCarousel = document.querySelector('.carousel');
        modalCarousel.style.display = "none";

        main.setAttribute('aria-hidden', "false");
        header.setAttribute('aria-hidden', "false");
        modalCarousel.setAttribute('aria-hidden', 'true');
        body.classList.remove('no-scroll');
    }

    const chevronLeft = document.querySelector('.fleche_right');
    const chevronRight = document.querySelector('.fleche_left');
    chevronLeft.focus();
    chevronRight.focus();

    let currentIndex = 0;

    function updateCarousel() {
        const test = document.querySelector('.carousel-affichage');
        const imageTitle = document.querySelector('.carousel-image-title');

        const currentMedia = media[currentIndex];

        if (currentMedia.image) {
            const photo = `assets/${user.name}/${currentMedia.image}`;
            test.innerHTML = `<img src="${photo}" class="carousel-image" alt="Lilac breasted roller" tabindex="0"/>`;
        } else if (currentMedia.video) {
            const videoPath = `assets/${user.name}/${currentMedia.video}`;
            test.innerHTML = `<video class="carousel-video" controls tabindex="0"><source src="${videoPath}" type="video/mp4" alt="Lilac breasted roller"></video>`;
        }

        imageTitle.textContent = currentMedia.title;
    }
    updateCarousel()

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

    // Modal Trie

    const select = document.querySelector('.simple');

    select.addEventListener("change", function () {

        if (select.options[this.selectedIndex].value == "popularite") {
            let trieLike = media.sort((a, b) => b.likes - a.likes);
            ClearAffichage()
            Affichage()
        } else if (select.options[this.selectedIndex].value == "date") {
            let trieDate = media.sort((a, b) => b.date - a.date);
            ClearAffichage()
            Affichage()
        } else if (select.options[this.selectedIndex].value == "titre") {
            let trieTitre = media.sort((a, b) => a.title.localeCompare(b.title));
            ClearAffichage()
            Affichage()
        }
    });
}
main()
