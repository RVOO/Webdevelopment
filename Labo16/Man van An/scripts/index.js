const setup = () => {
    const btn = document.getElementById("btn");
    btn.addEventListener("click", checkForAn)
}
const checkForAn = () =>{
    const text = "De man van An geeft geen hand aan ambetante verwanten.".toLowerCase();
    let count = -1;
    for(let last = 0; last !== -1; count++){
        last = text.indexOf("an", last + 1);
    }
    console.log(count);
}
window.addEventListener("load", setup);