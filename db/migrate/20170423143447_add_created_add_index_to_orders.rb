class AddCreatedAddIndexToOrders < ActiveRecord::Migration[5.0]
  def change
    add_index :orders, :created_at
  end
end
