async function main() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    console.log(parseInt(id));

    const response = await fetch('.././data/photographers.json');
    const data = await response.json();
    console.log(data);
    const media = data.media.filter((el) => el.photographerId === parseInt(id));
    console.log(media);
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

    const pics = document.querySelector('.main-pics');
    let nbrLikes = 0
    media.forEach(element => {

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
            div.setAttribute('class', 'div');

            text.textContent = element.title;
            like.innerHTML = element.likes + "<i class='fa-solid fa-heart'></i>"
        } else {

            source.setAttribute('src', videoPath);
            source.setAttribute('type', 'video/mp4');
            video.setAttribute('class', 'image');
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
}
main()
