const setup = () => {
const p = document.createElement('p');
p.innerHTML = "This is a p-element";
const div = document.querySelector('div');
div.appendChild(p);
}

window.addEventListener("load", setup);