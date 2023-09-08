let nbrLikes = 0
function resetLikesCount() {
    nbrLikes = 0;
    document.querySelector('.float-like').innerHTML = nbrLikes + '<i class="fa-solid fa-heart" aria-label="likes"></i>';
}

function mediaTemplate(medias, user, index) {
    const { title, id, video, image, date, likes } = medias;

    // Après avoir récupéré les données on les affiches  
    function getUserCardDOM() {

        const mainDiv = document.createElement('div');
        mainDiv.setAttribute('class', 'main-div');

        const img = document.createElement('img');
        const btn = document.createElement('button');
        btn.setAttribute('aria-label', "Open carrousel");

        const photo = `assets/${user}/${image}`;

        const div = document.createElement('div');
        const text = document.createElement('p');
        const like = document.createElement('div');
        like.setAttribute('class', "photoLike");
        let jaime = false;

        const videoBalise = document.createElement('video');
        videoBalise.setAttribute('tabindex', "0");

        const source = document.createElement('source');
        const videoPath = `assets/${user}/${video}`;

        let likesImage = likes;

        // Si image sinon vidéo
        if (image != undefined) {
            // ajout des attributs
            img.setAttribute('src', photo);
            img.setAttribute('class', 'image');
            img.setAttribute('alt', title + ", closeup view")
            div.setAttribute('class', 'div');
            text.textContent = title;

            like.innerHTML = likesImage + "<i class='fa-solid fa-heart pointer' aria-label='likes'></i>"
        } else {
            // ajout des attributs
            source.setAttribute('src', videoPath);
            source.setAttribute('type', 'video/mp4');
            videoBalise.setAttribute('class', 'image');
            videoBalise.setAttribute('alt', title + ", closeup view")
            text.textContent = title;

            like.innerHTML = likesImage + "<i class='fa-solid fa-heart pointer' aria-label='likes'></i>"

            videoBalise.appendChild(source);
            mainDiv.appendChild(btn);
            btn.appendChild(videoBalise);
            div.setAttribute('class', 'div');
            div.appendChild(like);
            div.appendChild(text);
        }
        // Event ouvrir le carousel
        btn.addEventListener('click', () => displayModalCarousel(index));

        // Event ajout d'un like
        like.addEventListener('click', () => liker())

        nbrLikes += likesImage;

        function liker() {
            // Ajout d'un j'aime si il n'était pas like sinon on retire le j'aime
            if (jaime == false) {
                let likesImage = medias.likes += 1;
                like.innerHTML = likesImage + "<i class='fa-solid fa-heart pointer' aria-label='likes'></i>"
                nbrLikes++;
                document.querySelector('.float-like').innerHTML = nbrLikes + '<i class="fa-solid fa-heart" aria-label="likes"></i>';
                jaime = true
            } else {
                let likesImage = medias.likes -= 1;
                like.innerHTML = likesImage + "<i class='fa-solid fa-heart pointer'></i>"
                nbrLikes--;
                document.querySelector('.float-like').innerHTML = nbrLikes + '<i class="fa-solid fa-heart" aria-label="likes"></i>';
                jaime = false
            }
        }

        mainDiv.appendChild(btn);
        btn.appendChild(img)
        mainDiv.appendChild(div);
        div.appendChild(text);
        div.appendChild(like);

        return (mainDiv);
    }

    return { title, id, video, date, likes, image, user, getUserCardDOM }
}