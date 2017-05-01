class LineItemsController < ApplicationController
  def create
    @line_item = current_user.line_items.new(line_item_params)
    authorize(@line_item)
    if @line_item.save
      serialized = serialize(@line_item)
      ActionCable.server.broadcast('orders:orders', { type: 'created_line_item', line_item: serialized })
      respond_to do |format|
        format.json { render(json: serialized) }
      end
    else
      respond_to do |format|
        format.json do
          render json: { error: @line_item.errors.full_messages }, status: :unprocessable_entity
        end
      end
    end
  end

  def destroy
    @line_item = LineItem.find(params[:line_item][:id])
    authorize(@line_item)
    @line_item.destroy
    ActionCable.server.broadcast('orders:orders', { type: 'deleted_line_item', line_item: serialize(@line_item) })
    respond_to do |format|
      format.json { render json: { deleted: true } }
    end
  end

  private

  def line_item_params
    params.require(:line_item).permit(:name, :cost, :order_id)
  end
end
