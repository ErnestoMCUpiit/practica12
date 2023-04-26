var buttonContainer = document.getElementById('Bloques');
var buttons = buttonContainer.getElementsByTagName('button');

var botones = [];

for (var i = 0; i < 9; i++) {
	var numero = Math.floor(Math.random() * 9);
	while (botones.includes(numero)) {
		numero = Math.floor(Math.random() * 9);
	}

	botones.push(numero);
	buttons[i].innerHTML = numero;
}

function estaResuelto() {
	for (var i = 0; i < buttons.length - 1; i++) {
		if (parseInt(buttons[i].innerHTML) !== i + 1) {
			return false;
		}
	}
	return parseInt(buttons[buttons.length - 1].innerHTML) === 0;
}

function intercambiarBotones(indice1, indice2) {
	var temp = botones[indice1];
	botones[indice1] = botones[indice2];
	botones[indice2] = temp;
	buttons[indice1].innerHTML = botones[indice1];
	buttons[indice2].innerHTML = botones[indice2];
}

function moverBoton(indiceBoton) {
	var indiceCero = botones.indexOf(0);

	if ((indiceBoton === indiceCero - 1 && indiceCero % 3 !== 0) ||
		(indiceBoton === indiceCero + 1 && indiceCero % 3 !== 2) ||
		indiceBoton === indiceCero - 3 || indiceBoton === indiceCero + 3) {
		intercambiarBotones(indiceBoton, indiceCero);

		if (estaResuelto()) {
			alert('¡Felicidades! ¡Has resuelto el rompecabezas!');
			const texto= document.getElementById("cabecera");
			texto.innerText="¡Completado!!";
		}
	}
}

for (var i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener('click', function () {
		moverBoton(Array.prototype.indexOf.call(buttons, this));
	});
}