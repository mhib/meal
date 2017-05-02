class LineItemsController < ApplicationController
  def create
    @line_item = current_user.line_items.new(line_item_params)
    authorize(@line_item)
    if @line_item.save
      serialized = serialize(@line_item)
      ActionCable.server.broadcast(OrdersChannel::CHANNEL_NAME,
                                   type: 'created_line_item', line_item: serialized)
      render json: serialized
    else
      render json: { error: @line_item.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @line_item = LineItem.find(params[:line_item][:id])
    authorize(@line_item)
    @line_item.destroy
    ActionCable.server.broadcast(OrdersChannel::CHANNEL_NAME,
                                 type: 'deleted_line_item', line_item: serialize(@line_item))
    render json: { deleted: true }
  end

  private

  def line_item_params
    params.require(:line_item).permit(:name, :cost, :order_id)
  end
end
