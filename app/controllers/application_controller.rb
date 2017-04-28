class ApplicationController < ActionController::Base
  include Pundit

  protect_from_forgery with: :exception
  include SessionsHelper

  def ensure_logged_in
    redirect_to sign_in_path unless signed_in?
  end

  def serialize(object)
    ActiveModelSerializers::SerializableResource
      .new(object).as_json
  end
end
