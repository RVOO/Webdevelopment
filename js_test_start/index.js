const setup = () => {
    const select = document.getElementById("StaatKip");
    const letter = document.getElementById("letter");
    select.addEventListener("change", update);
    letter.addEventListener("change", update);
}

const update = () =>{
    const staatKipIndex = document.getElementById("Staatkip").selectedIndex;
    let stop = false;
    let staatKipChecked;
    const img = document.getElementById("img");
    img.className = "hidden";
    img.classList.toggle("hidden", false);
    staatKipChecked = staatKip[staatKipIndex].value;
    if(staatKipIndex === 1){
        img.classList.add("with-egg")
    }
    else if(staatKipIndex === 2){
        img.classList.add("without-egg")
    }




    let sentence1 = "Hierboven, een kip " + staatKipChecked.toLowerCase();
    const letter = document.getElementById("letter").value;

    const output = document.getElementById("note");

    let count = 0;
    if(letter !== null) {
        for (let i = 0; i < sentence1.length; i++) {
            if (sentence1[i] === letter) {
                count++;
            }
        }
        output.innerHTML = sentence1 + "<br>" + 'Letter "' + letter + '" komt ' +count+ " keer voor in bovenstaande zin.";
    }else{
        output.innerHTML = sentence1;
    }
}
window.addEventListener("load", setup);