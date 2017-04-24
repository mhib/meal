class ApplicationController < ActionController::Base
  include Pundit

  protect_from_forgery with: :exception
  include SessionsHelper

  def ensure_logged_in
    redirect_to sign_in_path unless signed_in?
  end

  def serialize(order)
    ActiveModelSerializers::SerializableResource
      .new(order, adapter: :json_api).as_json
  end
end
