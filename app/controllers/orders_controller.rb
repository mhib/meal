class OrdersController < ApplicationController
  def create
    @order = Order.new(create_params)
    authorize @order
    @order.owner = current_user
    if @order.save
      serialized = serialize(@order)
      ActionCable.server.broadcast(OrdersChannel::CHANNEL_NAME, { type: 'created_order',
                                                                  order: serialized })
      render json: serialized
    else
      render json: { error: @order.errors.full_messages }
    end
  end

  def update
    @order = Order.find(update_params[:id])
    authorize(@order)
    @order.update(update_params)
    serialized = serialize(@order)
    ActionCable.server.broadcast(OrdersChannel::CHANNEL_NAME, { type: 'changed_order_status',
                                                                order: serialized })
    render(json: serialized)
  end

  def archived_page
    authorize(:order)
    @not_today_orders = Order.not_today.includes(:owner, line_items: :user)
      .order(:status, created_at: :desc).page(params[:page].to_i)
    @not_today_orders_json = serialize(@not_today_orders.to_a)
    render json: {
      orders: @not_today_orders_json,
      page_count: @not_today_orders.total_pages
    }
  end

  private

  def create_params
    params.require(:order).permit(:restaurant)
  end

  def update_params
    params.require(:order).permit(:status, :id)
  end
end
