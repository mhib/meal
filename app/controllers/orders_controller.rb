class OrdersController < ApplicationController
  def create
    @order = Order.new(create_params)
    authorize @order
    @order.owner = current_user
    if @order.save
      ActionCable.server.broadcast('orders:orders', { type: 'created_order',
                                  order: serialize(@order) })
      respond_to do |format|
        format.json { render(json: @order, adapter: :json) }
      end
    else
      respond_to do |format|
        format.json { render json: { error: @order.errors.full_messages } }
      end
    end
  end

  def update
  end

  def archived_page
    authorize(:order)
    @not_today_orders = Order.not_today.includes(:owner, line_items: :user).order(:status, created_at: :desc).page(params[:page].to_i)
    @not_today_orders_json = serialize(@not_today_orders.to_a)
    respond_to do |format|
      format.json do
        render json: { orders: @not_today_orders_json[:data], page_count: @not_today_orders.total_pages }
      end
    end
  end

  private

  def create_params
    params.require(:order).permit(:restaurant)
  end
end
