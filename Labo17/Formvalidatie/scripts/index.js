const setup = () => {
 const btn = document.getElementById("Validate");
 btn.addEventListener("click", validate);
}

const validate = () =>{
    let veldenErrors = [];
    let labelSpans = document.getElementsByTagName("span");
    let inputs = document.getElementsByTagName("input");

    for(let i = 0; i<labelSpans.length; i++){
        labelSpans[i].innerHTML = "";
        inputs[i].className = "";
    }

    const voornaam = document.getElementById("voornaam").value;
    veldenErrors[0] = null;
    if(voornaam.length > 30){
        veldenErrors[0] = "max 30 karakters";
    }

    const familieNaam = document.getElementById("familieNaam").value;
    veldenErrors[1] = null;
    if(familieNaam.length === 0){
        veldenErrors[1] = "verplicht veld";
    }
    else if(familieNaam.length > 50){
        veldenErrors[1] = "max 50 karakters";
    }

    const geboortedatum = document.getElementById("geboortedatum").value;
    veldenErrors[2] = null;
    if(geboortedatum.length === 0){
        veldenErrors[2] = "verplicht veld";
    }
    else if(!isValideDate(geboortedatum)){
        veldenErrors[2] ="formaat is niet jjjj-mm-dd of geldige data";
    }

    const email = document.getElementById("email").value;
    veldenErrors[3] = null;
    if(email.length === 0){
        veldenErrors[3] = "verplicht veld";
    }
    else if(!validMailadress(email)){
        veldenErrors[3] = "geen geldig email adres";
    }

    const aantalKinderen = document.getElementById("aantalKinderen").value;
    veldenErrors[4] = null;
    if(isNaN(aantalKinderen) || aantalKinderen < 0){
        veldenErrors[4] = "is geen positief getal";
    }
    else if(aantalKinderen > 99){
        veldenErrors[4] = "is te vruchtbaar"
    }

    let allRight = true;
    for(let i = 0; i<veldenErrors.length; i++){
        if(veldenErrors[i] !== null){
            labelSpans[i].innerHTML += "error: " + veldenErrors[i];
            inputs[i].className = "error";
            allRight = false;
        }
    }
    if(allRight){
        window.alert("proficiat!");
    }
}
const isValideDate = (date) =>{
    let year = "";
    let month = "";
    let day = "";
    let dashCount = 0;
    for(let i = 0; i<date.length; i++){
        if(date[i] === "-"){
            dashCount++;
        }
        else if(!isNaN(date[i]) && dashCount === 0){
            year += date[i].toString();
        }
        else if(!isNaN(date[i]) && dashCount === 1){
            month += date[i].toString();
        }
        else if(!isNaN(date[i]) && dashCount === 2){
            day += date[i].toString();
        }
    }
    return !(year.length !== 4 || month.length !== 2 || day.length !== 2 ||
        Number(year) > Number(new Date().getFullYear()) || !validDay(day, month, year));

}

const validDay = (day, month, year) =>{
    if(month > 12 || month < 0){
        return false;
    }

    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if((Number(year)%400 ===0 || Number(year)%100 !==0) && Number(year)%4 ===0){
        daysInMonth[1] = 29;
    }
    const date = new Date(year + "-" + month + "-" + day)
    if(date.getMilliseconds() > Date.now){
        return false;
    }

    return !(Number(day) > daysInMonth[month - 1] || Number(day) < 1);
}

const validMailadress = (email) =>{
    let atCount = 0;
    let id = "";
    let server = "";
    let dot = false;
    let domain = "";
    for(let i = 0; i<email.length; i++){
        if(email[i] === "@"){
            atCount++;
        }
        else if(atCount === 1 && email[i] === "."){
            dot = true;
        }
        else if(email[i] === " "){
            return false;
        }
        else if(dot && (isAlphNumb(email[i]) || isAllowedSymbolServer(email[i]))){
            domain += email[i];
        }
        else if(atCount === 0 && (isAlphNumb(email[i]) || isAllowedSymbolId(email[i]))){
            id += email[i];
        }
        else if(atCount === 1 && (isAlphNumb(email[i]) || isAllowedSymbolServer(email[i]))){
            server += email[i];
        }else{
            return false;
        }

    }
    return !(id === "" || server === "" || dot === false || domain === "" || atCount !== 1);

}

const isAlphNumb = (c) =>{
    return c.length === 1 && (c.match(/[a-z]|[A-Z]/));
}
const isAllowedSymbolServer = (c) =>{
    return c.length === 1 && (c.match(/[0-9]|-/));
}
const isAllowedSymbolId = (c) =>{
    return c.length === 1 && (c.match(/[0-9]|-|_/));
}
window.addEventListener("load", setup);