class LocationsController < ApplicationController
  include LocationsHelper
  before_action :authenticate_user, only: [:new, :create, :edit, :update, :availability]
  
  def new
    @location = Location.new
    render :new
  end

  def create
    @location = Location.new(location_params)
    @location.owner_id = current_user.id
    if @location.save
      redirect_to "/account"
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    @location = Location.find(params[:id])
    render :edit
  end

  def update
    @location = Location.find(params[:id])
    params[:available_dates] = JSON.parse(params[:available_dates])
    if @location.update(location_params)
      redirect_to "/account"
    else
      render :edit
    end
  end
  
  def availability
    @location = Location.find(params[:id])
    @calendar = create_calendar
    render :availability
  end
  
  def show
    @location = Location.find(params[:id])
    # @calendar = create_calendar
    render :show
  end

  private

  def location_params
    params.permit(:street, :city, :state, :country, :zip_code, :category, :price, :notes, available_dates: [:startDate, :endDate], images: [])
  end
end