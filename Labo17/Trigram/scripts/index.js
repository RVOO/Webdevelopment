const setup = () => {
const btn = document.getElementById("btn");

btn.addEventListener("click", trigram);
}

const trigram = () =>{
    const input = document.getElementById("input");
    const outputField = document.getElementById("output");
    let outputText = "";
    const inputValue = input.value;
    inputValue.replaceAll(" ", "");

    for(let i = 0; i< inputValue.length; i++){
        console.log(inputValue.substring(i, i + 3));
        outputText += inputValue.substring(i, i + 3) + "<br>";
    }
    outputField.innerHTML = outputText;
}

window.addEventListener("load", setup);