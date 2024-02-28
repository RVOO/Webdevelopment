const setup = () => {
    const red = document.getElementById("redSlider");
    const green = document.getElementById("greenSlider");
    const blue = document.getElementById("blueSlider");
    update();
    red.addEventListener("change", update);
    green.addEventListener("change", update);
    blue.addEventListener("change", update);
}
const update = () =>{
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
    const swatch = document.getElementById("swatch");
    swatch.style.backgroundColor = rgb;
}
window.addEventListener("load", setup);