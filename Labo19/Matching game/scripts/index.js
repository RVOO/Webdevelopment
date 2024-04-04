let global = {
    AANTAL_HORIZONTAAL : 4,
    AANTAL_VERTICAAL : 3,
    aantalPhotos : [],
    aantalSounds : [],
    TOTAL_AMOUNT : 0,
    POSSIBLE_SUBJECTS_PIC : [
        "Penguins",
        "Groot",
        "Seals",
        "Coding"
    ],
    PHOTOS_PER_POSSIBLE_SUBJECT : [
        6,
        7,
        6,
        6
    ],
    POSSIBLE_SUBJECTS_SOUND : [
        "Birds",
        "Crickets",
        "Ambiance"
    ],
    AMOUNT_PER_POSSIBLE_SOUND : [
        8,
        4,
        8
    ],
    subjectPictures: [],
    subjectSounds : [],
    PIC_PATH : "images/",
    PIC_TYPE: ".jpg",
    SOUND_PATH : "sounds/",
    SOUNDS_TYPE : ".wav",
    BACKGROUND_PATH : "images/background.jpg",
    AMOUNT_TO_MATCH : 2,
    tries : 0,
    sounds : true,
    soundGame : false,
    maxCardsPerLine : 8,
    marginRatio : 0.05
}
let cardRatio = {
    width : 1, /*Note: It would be wise to keep this 1 at all cost, for easier debugging*/
    height : 1
}

const setup = () => {
    addSubjectChooser();
    const playBtn = document.getElementById("startBtn");
    playBtn.addEventListener("click", play);
    const restartBtns = document.getElementsByClassName("restart");
    for(let i = 0; i<restartBtns.length; i++){
        restartBtns[i].addEventListener("click", restart);
    }
    const inputsPictures = document.getElementsByClassName("subjectInputPictures");
    for(let i = 0; i<inputsPictures.length; i++){
        subjectCheck(inputsPictures[i])
    }

    const amountOfCards = document.getElementById("amountOfCards");
    updateAmount();
    amountOfCards.addEventListener("click", updateAmount);
    amountOfCards.addEventListener("input", updateAmount);
    hideExtraMenu();

    const sounds = document.getElementById("sounds");
    sounds.addEventListener("click", function () {global.sounds = !global.sounds});
    const soundsGame = document.getElementById("soundsGame");
    soundsGame.addEventListener("click", function () {global.soundGame = !global.soundGame});
    soundsGame.addEventListener("click", toggleGames);
}

const toggleGames = () =>{
    const pictures = document.getElementById("SubjectsPictures");
    const sounds = document.getElementById("SubjectsSounds");
    pictures.classList.toggle("hidden");
    sounds.classList.toggle("hidden");
    if(global.soundGame){
        const inputsSounds = document.getElementsByClassName("subjectInputSounds");
        for(let i = 0; i<inputsSounds.length; i++){
            subjectCheck(inputsSounds[i])
        }
    }else{
        const inputsPictures = document.getElementsByClassName("subjectInputPictures");
        for(let i = 0; i<inputsPictures.length; i++){
            subjectCheck(inputsPictures[i])
        }
    }
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
    const parent = document.getElementById("SubjectsPictures");
    let subjects = clearNullsList(global.POSSIBLE_SUBJECTS_PIC);
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
        input.setAttribute("value", `${Math.floor(cardCount[i]/2)}`);
        label.classList.add("inputSubjectPictures");
        input.classList.add("subjectInputPictures");
        input.addEventListener("click", subjectUpdate);
        input.addEventListener("input", subjectUpdate);
        parent.appendChild(label);
        parent.appendChild(input);
    }
    const parentSound = document.getElementById("SubjectsSounds");
    let subjectsSound = clearNullsList(global.POSSIBLE_SUBJECTS_SOUND);
    let soundCount = clearNullsList(global.AMOUNT_PER_POSSIBLE_SOUND);
    for(let i = 0; i<subjectsSound.length; i++){
        let label = document.createElement("label");
        let input = document.createElement("input");
        label.innerHTML = `${subjectsSound[i]}:`;
        label.setAttribute("for", `${subjectsSound[i]}`);
        input.setAttribute("Data-subject", `${subjectsSound[i]}`);
        input.setAttribute("type", "number");
        input.setAttribute("id", `${subjectsSound[i]}`);
        input.setAttribute("name", `Cardcount of ${subjectsSound[i]}`);
        input.setAttribute("max", `${soundCount[i]}`);
        input.setAttribute("min", "0");
        input.setAttribute("value", `${Math.floor(soundCount[i]/2)}`);
        label.classList.add("inputSubjectSounds");
        input.classList.add("subjectInputSounds");
        input.addEventListener("click", subjectUpdate);
        input.addEventListener("input", subjectUpdate);
        parentSound.appendChild(label);
        parentSound.appendChild(input);
    }
}

const subjectUpdate = (event)=>{
    let input = event.currentTarget;
    subjectCheck(input);
}
const subjectCheck = (input) =>{
    if(!global.soundGame) {
        if (input.value === "0" || input.value === null) {
            let index = global.subjectPictures.indexOf(input.getAttribute("Data-subject"));
            global.subjectPictures[index] = null;
            global.aantalPhotos[index] = null;
        } else if (global.subjectPictures.indexOf(input.getAttribute("Data-subject")) === -1) {
            global.subjectPictures.push(input.getAttribute("Data-subject"));
            global.aantalPhotos.push(input.value);
        } else {
            global.aantalPhotos[global.subjectPictures.indexOf(input.getAttribute("Data-subject"))] = input.value;
        }
    }else{
        if (input.value === "0" || input.value === null) {
            let index = global.subjectSounds.indexOf(input.getAttribute("Data-subject"));
            global.subjectSounds[index] = null;
            global.aantalSounds[index] = null;
        } else if (global.subjectSounds.indexOf(input.getAttribute("Data-subject")) === -1) {
            global.subjectSounds.push(input.getAttribute("Data-subject"));
            global.aantalSounds.push(input.value);
        } else {
            global.aantalSounds[global.subjectSounds.indexOf(input.getAttribute("Data-subject"))] = input.value;
        }
    }
}

const play = () =>{
    if(!global.soundGame) {
        if (clearNullsList(global.aantalPhotos).length !== 0) {
            const begin = document.getElementById("Beginning");
            begin.classList.add("hidden");
            createCards();
            const gameField = document.getElementById("Game");
            gameField.classList.remove("hidden");
            amountOfCards();
        } else {
            window.alert("No subject chosen");
        }
    }else{
        if (clearNullsList(global.aantalSounds).length !== 0) {
            const begin = document.getElementById("Beginning");
            begin.classList.add("hidden");
            createCards();
            const gameField = document.getElementById("Game");
            gameField.classList.remove("hidden");
            amountOfCards();
        } else {
            window.alert("No subject chosen");
        }
    }
}

const createListCardPaths = () =>{
    const List = [];
    for(let i = 0; i< global.AMOUNT_TO_MATCH; i++) {
        if(!global.soundGame) {
            for (let i = 0; i < global.aantalPhotos.length; i++) {
                let amount = global.aantalPhotos[i];
                let subject = global.subjectPictures[i];
                for (let ind = 0; ind < amount; ind++) {
                    List.push(`${global.PIC_PATH}${subject}_${ind}${global.PIC_TYPE}`);
                }
            }
        }else{
            for (let i = 0; i < global.aantalSounds.length; i++) {
                let amount = global.aantalSounds[i];
                let subject = global.subjectSounds[i];
                for (let ind = 0; ind < amount; ind++) {
                    List.push(`${global.SOUND_PATH}${subject}_${ind}${global.SOUNDS_TYPE}`);
                }
            }
        }
    }
    return List;
}

const createCards = () =>{
    const playField = document.getElementById("PlayField");
    let data = createListCardPaths();
    while(data.length > 0) {
        const img = document.createElement("img");
        img.classList.add("card");
        img.setAttribute("src", global.BACKGROUND_PATH);
        let random = Math.floor(Math.random()*data.length);
        img.setAttribute("Data-other", data[random]);
        data[random] = null;
        data = clearNullsList(data);
        img.addEventListener("click", turn);
        img.addEventListener("click", update);
        playField.appendChild(img);
    }
    algorithm(document.getElementsByClassName("card"), playField);
}

const turn = (event) =>{
    let turned = document.getElementsByClassName("turned");
    let amountTurned = turned.length;
    if(amountTurned < global.AMOUNT_TO_MATCH) {
        let img = event.currentTarget;
        if(!global.soundGame) {
            img.setAttribute("src", img.getAttribute("Data-other"));
            img.classList.add("turned");
        }else{
            let audio = new Audio(`${img.getAttribute("Data-other")}`)
            audio.play();
            img.classList.add("turned");
            setTimeout(function(){audio.pause()}, 5000);
        }
        if(global.sounds === true && global.soundGame === false)
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
            if(turned[i].getAttribute("Data-other") !== turned[0].getAttribute("Data-other")){
                match = false;
            }
        }
        if(match === true){
            if(global.sounds === true && global.soundGame === false)
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
            if(global.sounds === true && global.soundGame === false)
            {
                let audio = new Audio("sounds/Sad_Trombone.mp3");
                audio.volume = 0.3;
                audio.play();
            }
            setTimeout(turnBack, 500);
        }
    }

    const found = document.getElementsByClassName("found");
    if(found.length === global.TOTAL_AMOUNT){
        endGame();
    }
}

const amountOfCards = () =>{
    let amount = 0;
    if(!global.soundGame) {
        for (let i = 0; i < global.aantalPhotos.length; i++) {
            amount += Number(global.aantalPhotos[i] * global.AMOUNT_TO_MATCH);
        }
    }else{
        for (let i = 0; i < global.aantalSounds.length; i++) {
            amount += Number(global.aantalSounds[i] * global.AMOUNT_TO_MATCH);
        }
    }
    global.TOTAL_AMOUNT = amount;
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


const algorithm = (cards, field) =>{

    const fieldWidth = (window.innerWidth - field.offsetLeft);
    const amountOfcards = cards.length;

    if(global.maxCardsPerLine !== null && global.maxCardsPerLine !== 0){
        let cardsPerRow = null;
        let valueForI = 2;
        while(cardsPerRow === null || global.maxCardsPerLine < cardsPerRow || cardsPerRow === 0 || fieldWidth/cardsPerRow < 150){
            let stop = false;
            for (let i = valueForI; i <= amountOfcards && !stop; i++) {
                if (amountOfcards % i === 0) {
                    cardsPerRow = amountOfcards / i;
                    valueForI = i;
                    stop = !stop;
                }
            }
            valueForI++;
        }
        let width = fieldWidth/cardsPerRow;
        let margin;
        if(width*global.marginRatio > 10){
            margin = 5;
        }else{
            margin = width*global.marginRatio;
        }
         width = Math.floor(width*((1-(global.marginRatio*2))*cardRatio.width))*0.95;


        /*Geimplementeerd aangezien het anders te groot is voor iets van overzicht te hebben*/
        if(width > 300){
            width = 150;
        }


        for(let i = 0; i<cards.length; i++){
            cards[i].width = width;
            cards[i].style.height = `${cards[i].width*cardRatio.height}px`;
            cards[i].style.margin = `${margin}px`;
        }
    }else{
        console.log("Not enough data");
    }
}
window.addEventListener("load", setup);