const setup = () => {
	// deze code wordt pas uitgevoerd als de pagina volledig is ingeladen
    window.alert('lots of questions coming!')

    console.log(window.confirm('Are you sure?, choose ok'));
    console.log(window.confirm('Are you sure?, choose cancel'));

    console.log(window.prompt('Type something', 'something'));
    console.log(window.prompt('Type nothing', 'nothing'));
}

window.addEventListener("load", setup);