let global = {
    IMAGE_COUNT: 5, // aantal figuren
    IMAGE_SIZE: 48, // grootte van de figuur
    IMAGE_PATH_PREFIX: "images/", // map van de figuren
    IMAGE_PATH_SUFFIX: ".png", // extensie van de figuren
    MOVE_DELAY: 3000, // aantal milliseconden voor een nieuwe afbeelding verschijnt
    score: 0, // aantal hits
    timeoutId: 0 // id van de timeout timer, zodat we die kunnen annuleren
};
const setup = () => {
    let imgs = document.getElementsByClassName("target");
    let startBtn = document.getElementById("startBtn");
    for(let i = 0; i<imgs.length; i++){
        imgs[i].classList.add("hidden");
    }
    startBtn.addEventListener("click", play);
    global.timeoutId = setInterval(randomImg, 2000);
};

const play = (event) =>{
    let btn = event.currentTarget;
    btn.classList.add("hidden");
    score = 0;
    let points = document.getElementById("score");
    points.innerHTML = "Aantal hits: " + score;

    let add = document.getElementById("addBtn");
    let del = document.getElementById("delBtn");
    add.addEventListener("click", addTarget);
    del.addEventListener("click", delTarget);

    let targets = document.getElementsByClassName("target");
    for(let i = 0; i<targets.length; i++){
        targets[i].classList.remove("hidden");
        targets[i].removeEventListener("click", lost);
    }
    randomNoClick();
}

const lost = () =>{
    window.alert("Game over!");
    clearTimeout(global.timeoutId);
    let btn = document.getElementById("startBtn");
    btn.classList.remove("hidden");
    btn.value = "Play again";
}

const switchPlacesClick = (event) =>{
    let img = event.currentTarget;
    let height = img.height/2 + Math.random()  * (img.parentElement.scrollHeight - img.height*2);
    let width = img.width/2 + Math.random() * (img.parentElement.scrollWidth - img.width*2);
    let points = document.getElementById("score");
    score++;
    points.innerHTML = "Aantal hits: " + score;
    img.style.top = height.toString() + "px";
    img.style.left = width.toString() + "px";
}

const randomImgClick = (event)=>{
    let img = event.currentTarget;
    let random = Math.floor(Math.random() * global.IMAGE_COUNT);
    img.setAttribute("src", `${global.IMAGE_PATH_PREFIX}${random}${global.IMAGE_PATH_SUFFIX}`);

    if(random === 0) {
        img.removeEventListener("click", randomImgClick);
        img.removeEventListener("click", switchPlacesClick);
        img.addEventListener("click", lost);
    }else{
        img.removeEventListener("click", lost);
        img.addEventListener("click", randomImgClick);
        img.addEventListener("click", switchPlacesClick);
    }
}

const randomNoClick = () =>{
    let targets = document.getElementsByClassName("target");
    for(let i = 0; i<targets.length; i++){
        let random = Math.floor(Math.random() * global.IMAGE_COUNT);
        targets[i].setAttribute("src", `${global.IMAGE_PATH_PREFIX}${Math.floor(random)}${global.IMAGE_PATH_SUFFIX}`);

        if(random === 0) {
            targets[i].removeEventListener("click", randomImgClick);
            targets[i].removeEventListener("click", switchPlacesClick);
            targets[i].addEventListener("click", lost);
        }else{
            targets[i].removeEventListener("click", lost);
            targets[i].addEventListener("click", randomImgClick);
            targets[i].addEventListener("click", switchPlacesClick);
        }

        let height = targets[i].height/2 + Math.random()  * (targets[i].parentElement.scrollHeight - targets[i].height*2);
        let width = targets[i].width/2 + Math.random() * (targets[i].parentElement.scrollWidth - targets[i].width*2);
        targets[i].style.top = height.toString() + "px";
        targets[i].style.left = width.toString() + "px";
    }
}

const randomImg = ()=>{
    let targets = document.getElementsByClassName("target");
    for(let i = 0; i<targets.length; i++) {
       let random =Math.floor(Math.random() * global.IMAGE_COUNT);
        targets[i].setAttribute("src", `${global.IMAGE_PATH_PREFIX}${random}${global.IMAGE_PATH_SUFFIX}`);

        if (random === 0) {
            targets[i].removeEventListener("click", randomImgClick);
            targets[i].removeEventListener("click", switchPlacesClick);
            targets[i].addEventListener("click", lost);
        } else {
            targets[i].removeEventListener("click", lost);
            targets[i].addEventListener("click", randomImgClick);
            targets[i].addEventListener("click", switchPlacesClick);
        }
    }
}

const addTarget = () =>{
    let target = document.createElement("img");
    target.setAttribute("src","images/0.png");
    target.setAttribute("alt", "target");
    target.classList.add("target");
    let playField = document.getElementById("playField");
    playField.appendChild(target);
    randomNoClick();
}

const delTarget = () =>{
    let targets = document.getElementsByClassName("target");
    if(targets.length !== 1){
        targets[targets.length - 1].remove();
    }else{
        window.alert("At least one survivor must remain!");
    }
}

window.addEventListener("load", setup);


