class TrainersController < ApplicationController
	def index
		trainer = Trainer.all 
		render json: trainer.to_json(
			:include => {:pokemon => {:except => [:created_at, :updated_at]}}
		)
	end
end
