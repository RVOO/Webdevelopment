const setup = () => {
	// deze code wordt pas uitgevoerd als de pagina volledig is ingeladen
    let substringBtn = document.getElementById("substring");
    substringBtn.addEventListener("click", substring);

}

const substring = () => {
    let inputText = document.getElementById("fullWord");
    let beginIndexBlok = document.getElementById("beginIndex");
    let eindIndexBlok = document.getElementById("eindIndex");
    let output = document.getElementById("txtOutput");

    let word = inputText.value;
    let beginIndex = parseInt(beginIndexBlok.value, 10);
    let eindIndex = parseInt(eindIndexBlok.value, 10);

    output.innerHTML = word.substring(beginIndex, eindIndex);
}

window.addEventListener("load", setup);

