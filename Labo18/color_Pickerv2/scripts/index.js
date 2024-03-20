const setup = () => {
    const red = document.getElementById("redSlider");
    const green = document.getElementById("greenSlider");
    const blue = document.getElementById("blueSlider");
    const btn = document.querySelector("#savebtn");
    update();
    red.addEventListener("change", update);
    green.addEventListener("change", update);
    blue.addEventListener("change", update);
    btn.addEventListener("click", save);
    btn.addEventListener("click", update);
}
const update = () =>{
    let rgb = getRGBValue();
    const swatch = document.getElementById("swatch");
    swatch.style.backgroundColor = rgb;
}

const getRGBValue = () =>{
    const values = document.getElementsByClassName("Value");
    const sliders = document.getElementsByClassName("sliders");
    let rgb = "rgb(";
    for(let i = 0; i<sliders.length; i++){
        values[i].innerHTML = sliders[i].value;
        rgb += sliders[i].value;
        if(i === (sliders.length - 1)){
            rgb += ")";
        }else{
            rgb += ", ";
        }
    }
    return rgb;
}
const save = () =>{
    const rgb = getRGBValue();
    let div = document.createElement('div');
    div.setAttribute("data-red", rgb.substring(4, rgb.indexOf(",")));
    div.setAttribute("data-green", rgb.substring( rgb.indexOf(",") + 1, rgb.indexOf(",", rgb.indexOf(",") + 1)));
    div.setAttribute("data-blue", rgb.substring(rgb.indexOf(",", rgb.indexOf(",") + 1) + 1, rgb.indexOf(")")));
    div.style.backgroundColor = rgb;
    div.classList.add("swatch");
    div.classList.add("saved");
    div.addEventListener("click", getSaved);

    let del = document.createElement('input');
    del.setAttribute("type", "button");
    del.setAttribute("value", "x");
    del.classList.add("delete");
    del.addEventListener("click", deleteSwatch);
    const body = document.querySelector("body");
    body.appendChild(div);
    div.appendChild(del);
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

const deleteSwatch = (btn) =>{
    const swatch = btn.currentTarget.parentElement;
    btn.currentTarget.remove();
    swatch.remove();
}
window.addEventListener("load", setup);