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
	// let pokemonList = document.createElement('p');
	let pokemonContainer = document.createElement('ul')
	
		trainer.pokemon.forEach(pokemon => {
		let pokemonElement = document.createElement('li');
		pokemonElement.dataset.id = pokemon.id;
		pokemonElement.innerText = `${pokemon.nickname} (${pokemon.species})`
		let deleteBtn = document.createElement('button');
		deleteBtn.addEventListener('click', deleteFn);
		deleteBtn.innerText = "release"
		deleteBtn.classList.add('release');
		
		pokemonElement.appendChild(deleteBtn);
		pokemonContainer.appendChild(pokemonElement)
	});

	// pokemonList.appendChild(pokemonContainer);
	trainerCard.appendChild(trainerName);
	trainerCard.appendChild(pokemonBtn);
	trainerCard.appendChild(pokemonContainer);
	trainerArea.appendChild(trainerCard);
	
}

function deleteFn(event) {
	fetch(`http://localhost:3000/pokemons/${event.target.parentElement.dataset.id}`, {
		method: "DELETE"
	})
	event.target.parentElement.remove();
}

function addPokemon(event) {
	fetch("http://localhost:3000/pokemons", {
		method: 'POST',
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify({"trainer_id": `${event.target.parentElement.dataset.id}`}) 
	})
	.then(response => response.json())
	.then(pokemon => {
		let pokemonArea = event.target.parentElement.querySelector('ul');
		let pokemonElement = document.createElement('li');
		pokemonElement.dataset.id = pokemon.id;
		pokemonElement.innerText = `${pokemon.nickname} (${pokemon.species})`
		let deleteBtn = document.createElement('button');
		deleteBtn.addEventListener('click', deleteFn);
		deleteBtn.innerText = "release"
		deleteBtn.classList.add('release');
		
		pokemonElement.appendChild(deleteBtn);
		pokemonArea.appendChild(pokemonElement)
	})
}
