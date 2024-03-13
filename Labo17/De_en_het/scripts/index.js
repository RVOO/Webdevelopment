const setup = () => {
const btn = document.getElementById("btn");
btn.addEventListener("click", replace);
}

const replace = () =>{
    const input = document.getElementById("input");
    const inputValue = input.value;

    let words = [];

    let lastIndex = 0;
    for(let i = 0; lastIndex !== -1; i = lastIndex + 1){
        lastIndex = inputValue.indexOf(" ", i);
        if(lastIndex !== -1){
            words.push(inputValue.substring(i, lastIndex));
        }else{
            words.push(inputValue.substring(i));
        }
    }

    let outputText = "";
    for(let i = 0; i<words.length; i++){
        if(words[i] === "de"){
            words[i] = "het"
        }
        else if(words[i] === "De"){
            words[i] = "Het"
        }
        console.log(words[i]);
        outputText += words[i] + " ";
    }
    let output = document.getElementById("output");
    output.innerHTML = outputText.trim();
}

window.addEventListener("load", setup);