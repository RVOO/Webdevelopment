let global = {
    AANTAL_HORIZONTAAL : 4,
    AANTAL_VERTICAAL : 3,
    aantalPhotos : [],
    TOTAL_AMOUNT_OF_CARDS : 0,
    POSSIBLE_SUBJECTS : [
        "Penguins",
        "Groot",
        "Seals",
        "Coding"
    ],
    PHOTOS_PER_POSSIBLE_SUBJECT : [
        6,
        7,
        6,
        12
    ],
    subject: [],
    PIC_PATH : "images/",
    PIC_TYPE: ".jpg",
    BACKGROUND_PATH : "images/background.jpg",
    AMOUNT_TO_MATCH : 2,
    tries : 0,
    sounds : true
}

const setup = () => {
    addSubjectChooser();
    const playBtn = document.getElementById("startBtn");
    playBtn.addEventListener("click", play);
    const restartBtns = document.getElementsByClassName("restart");
    for(let i = 0; i<restartBtns.length; i++){
        restartBtns[i].addEventListener("click", restart);
    }
    const inputs = document.getElementsByClassName("subjectInput");
    for(let i = 0; i<inputs.length; i++){
        subjectCheck(inputs[i])
    }
    const amountOfCards = document.getElementById("amountOfCards");
    updateAmount();
    amountOfCards.addEventListener("click", updateAmount);
    amountOfCards.addEventListener("input", updateAmount);
    hideExtraMenu();

    const sounds = document.getElementById("sounds");
    sounds.addEventListener("click", function () {global.sounds = !global.sounds});
}

const revealExtraMenu = () =>{
    const img = document.getElementById("extra_menu_button");
    const extraMenu = document.getElementById("extra_menu");
    extraMenu.classList.remove("hidden");
    img.addEventListener("click", hideExtraMenu);
    img.removeEventListener("click", revealExtraMenu);
}
const hideExtraMenu = () =>{
    const img = document.getElementById("extra_menu_button");
    const extraMenu = document.getElementById("extra_menu");
    extraMenu.classList.add("hidden");
    img.addEventListener("click", revealExtraMenu);
    img.removeEventListener("click", hideExtraMenu);
}

const updateAmount = () =>{
    const amountOfCards = document.getElementById("amountOfCards");
    global.AMOUNT_TO_MATCH = Number(amountOfCards.value);
}

const addSubjectChooser = () =>{
    const parent = document.getElementById("Subjects");
    let subjects = clearNullsList(global.POSSIBLE_SUBJECTS);
    let cardCount = clearNullsList(global.PHOTOS_PER_POSSIBLE_SUBJECT);
    for(let i = 0; i<subjects.length; i++){
        let label = document.createElement("label");
        let input = document.createElement("input");
        label.innerHTML = `${subjects[i]}:`;
        label.setAttribute("for", `${subjects[i]}`);
        input.setAttribute("Data-subject", `${subjects[i]}`);
        input.setAttribute("type", "number");
        input.setAttribute("id", `${subjects[i]}`);
        input.setAttribute("name", `Cardcount of ${subjects[i]}`);
        input.setAttribute("max", `${cardCount[i]}`);
        input.setAttribute("min", "0");
        input.setAttribute("value", `${cardCount[i]/2}`);
        label.classList.add("inputSubject");
        input.classList.add("subjectInput");
        input.addEventListener("click", subjectUpdate);
        input.addEventListener("input", subjectUpdate);
        parent.appendChild(label);
        parent.appendChild(input);
    }
}

const subjectUpdate = (event)=>{
    let input = event.currentTarget;
    subjectCheck(input);
}
const subjectCheck = (input) =>{
    if(input.value === "0" || input.value === null){
        let index = global.subject.indexOf(input.getAttribute("Data-subject"));
        global.subject[index] = null;
        global.aantalPhotos[index] = null;
    }
    else if(global.subject.indexOf(input.getAttribute("Data-subject")) === -1) {
        global.subject.push(input.getAttribute("Data-subject"));
        global.aantalPhotos.push(input.value);
    }else{
        global.aantalPhotos[global.subject.indexOf(input.getAttribute("Data-subject"))] = input.value;
    }
}

const play = () =>{
    if(clearNullsList(global.aantalPhotos).length !== 0) {
        const begin = document.getElementById("Beginning");
        begin.classList.add("hidden");
        createCards();
        const gameField = document.getElementById("Game");
        gameField.classList.remove("hidden");
        amountOfCards();
    }else{
        window.alert("No subject chosen");
    }
}

const createListCardPaths = () =>{
    const pics = [];
    for(let i = 0; i< global.AMOUNT_TO_MATCH; i++) {
        for (let i = 0; i < global.aantalPhotos.length; i++) {
            let amount = global.aantalPhotos[i];
            let subject = global.subject[i];
            for (let ind = 0; ind < amount; ind++) {
                pics.push(`${global.PIC_PATH}${subject}_${ind}${global.PIC_TYPE}`);
            }
        }
    }
    return pics;
}

const createCards = () =>{
    const playField = document.getElementById("PlayField");
    let pics = createListCardPaths();
    while(pics.length > 0) {
        const img = document.createElement("img");
        img.classList.add("card");
        img.setAttribute("src", global.BACKGROUND_PATH);
        let random = Math.floor(Math.random()*pics.length);
        img.setAttribute("Data-pic", pics[random]);
        pics[random] = null;
        pics = clearNullsList(pics);
        img.addEventListener("click", turn);
        img.addEventListener("click", update);
        playField.appendChild(img);
    }
}

const turn = (event) =>{
    let amountTurned = document.getElementsByClassName("turned").length;
    if(amountTurned < global.AMOUNT_TO_MATCH) {
        let img = event.currentTarget;
        img.setAttribute("src", img.getAttribute("Data-pic"));
        img.classList.add("turned");
        if(global.sounds === true)
        {
            let audio = new Audio("sounds/Card_Flip.mp3");
            audio.play();
        }
    }
}

const update = () =>{
    const turned = document.getElementsByClassName("turned");
    let length = turned.length;
    if(length === global.AMOUNT_TO_MATCH){
        global.tries++;
        const tries = document.getElementById("triesH");
        tries.innerText = global.tries;
        let match = true;
        for(let i = 0; i<length && match === true; i++){
            if(turned[i].getAttribute("src") !== turned[0].getAttribute("src")){
                match = false;
            }
        }
        if(match === true){
            if(global.sounds === true)
            {
                let audio = new Audio("sounds/Ding_Correct.mp3");
                audio.play();
            }
            for(let i = 0; i<length; i++){
                turned[0].classList.add("found");
                turned[0].removeEventListener("click", turn);
                turned[0].removeEventListener("click", update);
                turned[0].classList.remove("turned");
            }

        }else{
            if(global.sounds === true)
            {
                let audio = new Audio("sounds/Sad_Trombone.mp3");
                audio.volume = 0.5;
                audio.play();
            }
            setTimeout(turnBack, 500);
        }
    }

    const found = document.getElementsByClassName("found");
    if(found.length === global.TOTAL_AMOUNT_OF_CARDS){
        endGame();
    }
}

const amountOfCards = () =>{
    let amount = 0;
    for(let i = 0; i<global.aantalPhotos.length; i++){
        amount += Number(global.aantalPhotos[i]*global.AMOUNT_TO_MATCH);
    }
    global.TOTAL_AMOUNT_OF_CARDS = amount;
}

const turnBack = () =>{
    const turned = document.getElementsByClassName("turned");
    let length = turned.length;
    for(let i = 0; i<length; i++){
        turned[0].setAttribute("src", global.BACKGROUND_PATH);
        turned[0].classList.remove("turned");
    }
}

const clearNullsList = (list) =>{
    const resultList = [];
    for(let i = 0; i<list.length; i++){
        if(list[i] !== null && list[i] !== ""){
            resultList.push(list[i]);
        }
    }
    return resultList;
}

const endGame = () =>{
    const gameField = document.getElementById("Game");
    gameField.classList.add("hidden");
    const div = document.getElementById("Ending");
    div.classList.remove("hidden");
    const tries = document.getElementById("tries");
    tries.innerText = global.tries;
}

const restart = () =>{
    endGame();
    global.tries = 0;
    const tries = document.getElementById("triesH");
    tries.innerText = global.tries;
    const end = document.getElementById("Ending");
    end.classList.add("hidden");
    const begin = document.getElementById("Beginning");
    begin.classList.remove("hidden");
    const playField = document.getElementById("PlayField");
    playField.innerHTML = "";
}
window.addEventListener("load", setup);