class LineItemsController < ApplicationController
  def create
    @line_item = current_user.line_items.new(line_item_params)
    authorize(@line_item)
    if @line_item.save
      ActionCable.server.broadcast('orders:orders', { type: 'created_line_item',
                                  line_item: serialize(@line_item) })
      respond_to do |format|
        format.json { render(json: @line_item, adapter: :json) }
      end
    else
      respond_to do |format|
        format.json { render json: { error: @line_item.errors.full_messages } }
      end
    end
  end

  def update
  end

  def destroy
  end

  private
  def line_item_params
    params.require(:line_item).permit(:name, :cost, :order_id)
  end
end
