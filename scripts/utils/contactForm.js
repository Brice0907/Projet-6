const mainPage = document.querySelector('#main');
const header = document.querySelector('.header');
const body = document.querySelector('.body');

function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
    modal.setAttribute('class', 'pop');

    mainPage.setAttribute('aria-hidden', "true");
    header.setAttribute('aria-hidden', "true");
    modal.setAttribute('aria-hideden', 'false');
    body.classList.add('no-scroll');
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";

    mainPage.setAttribute('aria-hidden', "false");
    header.setAttribute('aria-hidden', "false");
    modal.setAttribute('aria-hideden', 'true');
    body.classList.remove('no-scroll');
}
window.addEventListener("keydown", function (event) {
    if (event.key == "Escape") {
        closeModal()
    }
})
const form = document.querySelector('.form');

form.addEventListener('submit', async (e) => {

    e.preventDefault();

    const firstName = document.querySelector('#first');
    const lastName = document.querySelector('#last');
    const email = document.querySelector('#email');
    const message = document.querySelector('#message');

    let contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
    }

    if (regexTest(contact)) {
        console.log(firstName.value);
        console.log(lastName.value);
        console.log(email.value);
        console.log(message.value);
        closeModal()
    }
});

function regexTest(contact) {

    let verif = true;

    if (!/^(?:[A-Z][a-z]*|[a-z][a-z]*)[ \-']?(?:[a-z]+[ \-']?)*[a-z]+$/.test(contact.firstName)) {
        document.querySelector('#first').classList.add('border-red');
        verif = false
    } else {
        document.querySelector('#first').classList.remove('border-red');
    }

    if (!/^(?:[A-Z][a-z]*|[a-z][a-z]*)[ \-']?(?:[a-z]+[ \-']?)*[a-z]+$/.test(contact.lastName)) {
        document.querySelector('#last').classList.add('border-red');
        verif = false
    } else {
        document.querySelector('#last').classList.remove('border-red');
    }

    if (!/^[a-zA-Z0-9.-_+]+@[a-zA-Z0-9.-_]+\.[a-z]{2,10}$/.test(contact.email)) {
        document.querySelector('#email').classList.add('border-red');
        verif = false
    } else {
        document.querySelector('#email').classList.remove('border-red');
    }

    if (verif === false) {
        return false;
    } else {
        return true;
    }
}