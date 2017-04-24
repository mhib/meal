class AddLineItemsCountToOrder < ActiveRecord::Migration[5.0]
  def change
    add_column :orders, :line_items_count, :integer, default: 0
  end
end
