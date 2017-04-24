module SessionsHelper
  AUTH_COOKIE_KEY = 'current_user_id'.freeze

  def signed_in?
    cookies[AUTH_COOKIE_KEY] && current_user
  end

  def current_user
    @current_user ||= User.find_by_id(cookies.signed[AUTH_COOKIE_KEY])
  end

  def sign_in(user)
    cookies.signed[AUTH_COOKIE_KEY] = user.id
  end

  def clear_cookies
    cookies.delete(AUTH_COOKIE_KEY)
  end
end
