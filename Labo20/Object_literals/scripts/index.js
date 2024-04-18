
const setup = () => {
    let student={
        voornaam : "Jan",
        familienaam : "Janssens",
        geboorteDatum : new Date("1993-12-31"),
        adres : { // een object
            straat : "Kerkstraat 13",
            postcode : "8500",
            gemeente : "Kortrijk"
        },
        isIngeschreven : true,
        namenVanExen : ["Sofie", "Berta", "Philip", "Albertoooo"], // een array
        aantalAutos : 2
    };

    console.log(JSON.stringify(student));

    const btn = document.getElementById("btn");
    btn.addEventListener("click", log)
}

const log = () =>{
    const input = document.getElementById("jsonInput");
    let student = JSON.parse(input.value);
    console.log(student);
}

window.addEventListener("load", setup);