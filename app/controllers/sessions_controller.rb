class SessionsController < ApplicationController
  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.authenticate_by(login_params)
    if @user
      login @user
      redirect_to "/account", notice: "You have successfully signed in."
    else
      flash[:alert] = "Invalid email or password."
      render :new, status: :unprocessable_entity
    end
  end

  def destroy
    logout current_user
    redirect_to root_path, notice: "You have been logged out."
  end

  private
  
  def login_params
    params.permit(:email, :password)
  end
end