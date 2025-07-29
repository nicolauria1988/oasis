class UsersController < ApplicationController
  before_action :authenticate_user, only: [:edit, :update]
  
  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login @user
      redirect_to "/account", notice: "New user account created"
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    @user = User.find(params[:id])
    render :edit
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      login @user
      redirect_to "/account"
    else
      render :edit, status: :unprocessable_entity
    end
  end

  private
  def user_params
    params.permit(:name, :email, :phone, :password, :street, :city, :state, :country, :zip_code, :avatar)
  end
end