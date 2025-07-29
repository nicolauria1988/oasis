class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern
  helper_method :current_user
  
  private

  def authenticate_user
    current_user || (redirect_to new_session_path)
  end
  
  def login(user)
    reset_session
    session[:user_id] = user.id
  end
  
  def current_user
    @current_user = session[:user_id] && User.find_by(id: session[:user_id])
  end

  def logout(user)
    @current_user = nil
    reset_session
  end
end
