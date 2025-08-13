class ReservationsController < ApplicationController
  def create
    params[:user_id] = current_user.id
    
    @reservation = Reservation.new(reservation_params)
    if @reservation.save
      redirect_to "/account"
    else
      render location_path(params[:location_id])
    end
  end

  private

  def reservation_params
    params.permit(:user_id, :location_id, :start_date, :end_date, :total)
  end
end