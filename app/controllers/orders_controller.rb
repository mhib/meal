class OrdersController < ApplicationController
  def create
    @order = Order.new(create_params)
    authorize @order
    @order.owner = current_user
    if @order.save
      ActionCable.server.broadcast('orders:orders', { type: 'created_order',
                                                      order: serialize(@order) })
      respond_to do |format|
        format.json { render(json: @order) }
      end
    else
      respond_to do |format|
        format.json { render json: { error: @order.errors.full_messages } }
      end
    end
  end

  def update
    @order = Order.find(update_params[:id])
    authorize(@order)
    if @order.update(update_params)
      ActionCable.server.broadcast('orders:orders', { type: 'changed_order_status',
                                                      order: serialize(@order) })
      respond_to do |format|
        format.json { render(json: @order) }
      end
    end
  end

  def archived_page
    authorize(:order)
    @not_today_orders = Order.not_today.includes(:owner, line_items: :user).order(:status, created_at: :desc).page(params[:page].to_i)
    @not_today_orders_json = serialize(@not_today_orders.to_a)
    respond_to do |format|
      format.json do
        render json: { orders: @not_today_orders_json, page_count: @not_today_orders.total_pages }
      end
    end
  end

  private

  def create_params
    params.require(:order).permit(:restaurant)
  end

  def update_params
    params.require(:order).permit(:status, :id)
  end
end
