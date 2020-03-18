const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', fetchTrainers);


function fetchTrainers() {
	fetch(TRAINERS_URL)
	.then(response => response.json())
	.then(json => json.forEach(trainer => trainerCards(trainer)))
}

function trainerCards(trainer) {
	let trainerArea = document.querySelector('main');
	let trainerCard = document.createElement('div');
	trainerCard.dataset.id = trainer.id;
	trainerCard.classList.add('card');
	let trainerName = document.createElement('h3');
	trainerName.innerText = trainer.name;
	let pokemonBtn = document.createElement('button');
	pokemonBtn.innerText = "Add Pokemon"
	pokemonBtn.addEventListener('click', addPokemon);
	trainerCard.appendChild(trainerName);
	trainerCard.appendChild(pokemonBtn);
	trainerArea.appendChild(trainerCard);
	
}

function addPokemon(event) {
	// debugger
	let pokemonArea = document.createElement('div');
	fetch("http://localhost:3000/pokemons", {
		method: 'POST',
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify({"trainer_id": `${event.target.parentElement.dataset.id}`})
	})
	
}
