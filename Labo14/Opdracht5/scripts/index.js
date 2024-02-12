const setup = () => {
	// deze code wordt pas uitgevoerd als de pagina volledig is ingeladen

    let btnWijzigen=document.getElementById("Wijzig");
    btnWijzigen.addEventListener("click", wijziging)

}
const wijziging = () => {
    let pElement = document.getElementById("txtOutput");
    pElement.innerHTML = "Welkom!";
}
window.addEventListener("load", setup);