class MealsController < ApplicationController
  before_action :ensure_logged_in
  def index
    today_orders = Order.today.includes(:owner, line_items: :user).order(:status, created_at: :desc)
    @today_orders_json = serialize(today_orders)
    @not_today_orders = Order.not_today.includes(:owner, line_items: :user).order(:status, created_at: :desc).page(1)
    @not_today_orders_json = serialize(@not_today_orders.to_a)
  end
end
