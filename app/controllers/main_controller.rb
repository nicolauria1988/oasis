class MainController < ApplicationController
  before_action :authenticate_user, only: [:account]
  
  def home
    render :home
  end

  def account
    render :account
  end
end