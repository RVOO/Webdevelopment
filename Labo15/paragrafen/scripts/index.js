const setup = () => {
	const important = document.getElementsByClassName("Belangrijk");

    for(let i = important.length; i>0; i--){
        important[i].classList.add("Opvallend");
    }
}

window.addEventListener("load", setup);