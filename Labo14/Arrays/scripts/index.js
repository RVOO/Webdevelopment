const setup = () => {
	// deze code wordt pas uitgevoerd als de pagina volledig is ingeladen
    const familieLeden = ['Gerald Thompson', 'Baldimore porter', 'Jhon Jhonson', 'Terrazion Therra', 'Mortimor More'];

    console.log(familieLeden.length);

    console.log(familieLeden[0]);
    console.log(familieLeden[2]);
    console.log(familieLeden[4]);

    const voegNaamToe = () => {
        familieLeden.push(prompt('Who is the new member of the familie?', 'Mister Pupper'));
        console.log(familieLeden);
    }
    voegNaamToe();

    console.log(familieLeden.join());
}

window.addEventListener("load", setup);