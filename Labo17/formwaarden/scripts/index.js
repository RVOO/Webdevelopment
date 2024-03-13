const setup = () => {
    const btn = document.getElementById("btn");
    btn.addEventListener("click", result);
}

const result = () =>{
    let isSmoker = document.getElementById("isRoker").checked;
    if(isSmoker){
        isSmoker = "een";
    }else{
        isSmoker = "geen"
    }
    const motherlangList = document.getElementsByName("moedertaal");
    let motherlang = "";
    let i = 0
    let found = false;
    while(i<motherlangList.length && !found){
        if(motherlangList[i].checked){
            motherlang = motherlangList[i].value;
            found = true;
        }
        i++;
    }

    const favBuurlandList = document.getElementById("buurlanden").options;
    const favBuurlandIndex = document.getElementById("buurlanden").selectedIndex;
    let favBuurland = favBuurlandList[favBuurlandIndex].value;

    const bestellingList = document.getElementById("bestelling").options;
    let bestellingen = [];
    for(let i = 0; i<bestellingList.length; i++) {
        if (bestellingList[i].selected) {
            bestellingen.push(bestellingList[i].value)
        }
    }

    let returnValue = "Is " + isSmoker + " roker" + "<br>" +
    "Moedertaal is " + motherlang + "<br>" +
    "Favoriete buurland is " + favBuurland + "<br>" +
    "Bestelling bestaat uit ";
    for(let i = 0; i<bestellingen.length; i++){
        if(i === (bestellingen.length-2)){
            returnValue += bestellingen[i] + " en "
        }else if(i !== (bestellingen.length-1)) {
            returnValue += bestellingen[i] + ", ";
        }else{
            returnValue += bestellingen[i];
        }

    }
    document.getElementById("output").innerHTML = returnValue;
    returnValue = returnValue.replaceAll("<br>", "\n");
    console.log(returnValue.trim());
}

window.addEventListener("load", setup);