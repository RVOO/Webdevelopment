const setup = () => {
const listItems = document.querySelectorAll('li');
for(let i = 0; i<listItems.length; i++){
    listItems[i].classList.add('listItem');
}

const body = document.querySelector('body');
const img = document.createElement("img");
img.setAttribute('src', "me.jpeg");
body.appendChild(img);
}

window.addEventListener("load", setup);