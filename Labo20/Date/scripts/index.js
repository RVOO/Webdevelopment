const setup = () => {
 let btn = document.querySelector('#calculate');
 btn.addEventListener('click', calculateTime);
};

const calculateTime =() => {
    let currentDate = new Date();
    let birthday = new Date(document.getElementById('birthday').value);
    let timedif = new Date(currentDate - birthday);
    console.log(currentDate-birthday + " miliseconds");
    console.log((currentDate-birthday)/1000 + " seconds");
    console.log((currentDate-birthday)/(1000*60) + " minutes");
    console.log((currentDate-birthday)/(1000*60*60) + " hours");
    console.log((currentDate-birthday)/(1000*60*60*24) + " days");
    update();

    setInterval(update, 1)
};
const update = () =>{
    let currentDate = new Date();
    let birthday = new Date(document.getElementById('birthday').value);
    let timedif = new Date(currentDate - birthday);
    let array = [
        (timedif/1) +" miliseconds",
        Math.ceil(timedif/1000) + " seconds",
        Math.ceil(timedif/(1000*60)) + " minutes",
        Math.ceil(timedif/(1000*60*24)) + " hours",
        Math.ceil(timedif/(1000*60*60*24)) + " days"
    ]

    const h = document.querySelector('h3');
    h.textContent = birthday.toDateString();
    const ps = document.querySelectorAll('p');
    for(let i = 0; i<ps.length; i++){
        ps[i].textContent = array[i];
    }
}

window.addEventListener("load", setup);