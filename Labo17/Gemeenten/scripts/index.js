const setup = () => {
const btn = document.getElementById("btn");
btn.addEventListener("click", gemeenteOpvrager);
}

const gemeenteOpvrager = () =>{
    const lijst = document.getElementById("keuzelijst");
    const words = [];
    let stop = false;
    for(let i = 0; !stop; i++) {
        words[i] = window.prompt("Gemeente:");
        if(words[i] === "stop"){
            stop = true;
        }
        if(words[i] === null){
            stop = true;
        }
    }
    words.sort();
    for(let i = 0; i<words.length; i++){
        if(words[i] !== 'stop'){
            if(words[i] !== null) {
                if(words[i] !== "") {
                    lijst.innerHTML += "<option value=" + words[i] + ">" + words[i] + "</option>";
                }
            }
        }
    }
}

window.addEventListener("load", setup);