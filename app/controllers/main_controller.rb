class MainController < ApplicationController
  before_action :authenticate_user, only: [:account]
  
  def home
    @locations = Location.all
    render :home
  end

  def account
    render :account
  end
end