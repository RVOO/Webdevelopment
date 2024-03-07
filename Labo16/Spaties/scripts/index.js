const setup = () => {
    const btn = document.getElementById("btn");
    btn.addEventListener("click", maakMetSpaties);
}
const maakMetSpaties = () =>{
    let inputText = document.getElementById("inputText").value;
    let returnValue = "";
    for(let i = 0; i <inputText.length; i++){
        if(inputText.charAt(i) !== " "){
            returnValue += inputText.charAt(i) + " ";
        }
    }
    console.log(returnValue);
}
window.addEventListener("load", setup);