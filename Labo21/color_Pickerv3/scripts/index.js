const setup = () => {
    const sliders =document.querySelectorAll(".sliders");
    const btn = document.querySelector("#savebtn");
    let object = JSON.parse(localStorage.getItem("colours"));
    if(object !== null) {
        for (let i = 0; i < sliders.length; i++) {
            sliders[i].value = object[`${sliders[i].id}`];
            sliders[i].addEventListener("change", update);
            sliders[i].addEventListener("input", update);
        }
    }
    update();
    btn.addEventListener("click", save);
    btn.addEventListener("click", update);

    createSavedLocalStorageSwatchs();
}

const createSavedLocalStorageSwatchs = () => {
    let i = 0;
    let object = localStorage.getItem(`saved${i}`);
    while(object !== null) {
        i++;
        object = JSON.parse(object);
        let swatch = document.createElement("div");
        swatch.setAttribute("data-red", `${object['data-red']}`);
        swatch.setAttribute("data-green", `${object['data-green']}`);
        swatch.setAttribute("data-blue", `${object['data-blue']}`);
        swatch.style.backgroundColor = `rgb(${object['data-red']}, ${object['data-green']}, ${object['data-blue']})`;
        swatch.classList.add("swatch");
        swatch.classList.add("saved");
        swatch.addEventListener("click", getSaved);
        let del = getDeleteBtn();
        const saves = document.querySelector("#saves");
        saves.appendChild(swatch);
        swatch.appendChild(del);
        object = localStorage.getItem(`saved${i}`);
    }
}

const update = () =>{
    let object = getRGBValue();
    const swatch = document.getElementById("swatch");
    swatch.style.backgroundColor = object['rgb'];
    localStorage.setItem("colours", JSON.stringify(object));
}

const getRGBValue = () =>{
    const values = document.getElementsByClassName("Value");
    const sliders = document.getElementsByClassName("sliders");
    let object = {};
    let rgb = "rgb(";
    for(let i = 0; i<sliders.length; i++){
        values[i].innerHTML = sliders[i].value;
        object[sliders[i].id] = sliders[i].value;
        rgb += sliders[i].value;
        if(i === (sliders.length - 1)){
            rgb += ")";
        }else{
            rgb += ", ";
        }
    }
    object['rgb'] = rgb;
    return object;
}
const save = () =>{
    const rgb = getRGBValue()['rgb'];
    let div = document.createElement('div');
    div.setAttribute("data-red", rgb.substring(4, rgb.indexOf(",")));
    div.setAttribute("data-green", rgb.substring( rgb.indexOf(",") + 2, rgb.indexOf(",", rgb.indexOf(",") + 1)));
    div.setAttribute("data-blue", rgb.substring(rgb.indexOf(",", rgb.indexOf(",") + 1) + 2, rgb.indexOf(")")));
    div.style.backgroundColor = rgb;
    div.classList.add("swatch");
    div.classList.add("saved");
    div.addEventListener("click", getSaved);

    let del = getDeleteBtn();
    const field = document.querySelector("#saves");
    field.appendChild(div);
    div.appendChild(del);
    const saves = document.querySelectorAll(".saved");

    for(let i = 0; i<saves.length; i++){
        localStorage.removeItem(`saved${i}`);
    }
    for(let i = 0; i<saves.length; i++) {
        let object = localStorageSave(saves[i], i);
        localStorage.setItem(`saved${object.index}`, object["saved"]);
    }
}

const getDeleteBtn = () =>{
    let del = document.createElement('input');
    del.setAttribute("type", "button");
    del.setAttribute("value", "x");
    del.classList.add("delete");
    del.addEventListener("click", deleteSwatch);
    return del;
}

const localStorageSave = (swatch, index) =>{
    let saved = {};
    saved['data-red'] = swatch.getAttribute("data-red");
    saved['data-green'] = swatch.getAttribute("data-green");
    saved['data-blue'] = swatch.getAttribute("data-blue");
    const saves = document.querySelectorAll(".saved");
    return {saved: `${JSON.stringify(saved)}`, index: `${index}`};
}


const getSaved = (event) =>{
    let s=event.currentTarget;
    let red = s.getAttribute("data-red").trim();
    let green = s.getAttribute("data-green").trim();
    let blue = s.getAttribute("data-blue").trim();

    document.getElementById("redSlider").value = red;
    document.getElementById("greenSlider").value = green;
    document.getElementById("blueSlider").value = blue;
    update();
}

const deleteSwatch = (event) =>{
    event.stopPropagation();
    const swatch = event.currentTarget.parentElement;
    let field = swatch.parentElement;
    let index;
    for (let i = 0; i < field.childNodes.length; i++) {
        if (swatch === field.childNodes[i]) {
            index = i-1;
            break;
        }
    }
    localStorage.removeItem(`saved${index}`);
    event.currentTarget.remove();
    swatch.remove();
}
window.addEventListener("load", setup);