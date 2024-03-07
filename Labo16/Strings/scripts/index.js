const setup = () => {
    let leeftijd = 34;
    let intrest = 0.12;
    let isGevaarlijk = true;
    let vandaag = new Date();
    const print=(message)=>{
        console.log(message)
    }

    console.log(" let leeftijd = 34 is " + typeof(leeftijd));
    console.log(" let intrest = 0.12 is " + typeof(intrest));
    console.log(" let isGevaarlijk = true is " + typeof(isGevaarlijk));
    console.log(" let vandaag = new Date() is " + typeof(vandaag));
    console.log(" const print=(message)=>{\n" +
        "        console.log(message)\n" +
        "    } is " + typeof(print));

}

window.addEventListener("load", setup);