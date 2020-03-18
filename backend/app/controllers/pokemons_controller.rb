class PokemonsController < ApplicationController
	def index
		pokemon = Pokemon.all
		render json: pokemon.to_json()
	end

	def create
		name = Faker::Name.first_name
		species = Faker::Games::Pokemon.name
		pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
		render json: pokemon
	end

	def destroy
		pokemon = Pokemon.find(params[:id])
		pokemon.delete
	end
end
