class SessionsController < ApplicationController
  def new
    clear_cookies
    redirect_to '/auth/github'
  end

  def create
    auth = request.env["omniauth.auth"]
    user = User.find_or_create_by_oauth(auth)
    sign_in(user)
    redirect_to root_url
  end

  def destroy
    clear_cookies
    redirect_to root_path
  end
end
