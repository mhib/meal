class CreateOrders < ActiveRecord::Migration[5.0]
  def change
    create_table :orders do |t|
      t.string :restaurant, null: false
      t.integer :status, default: 0
      t.references :owner, index: true, foreign_key: { to_table: :users }, null: false

      t.timestamps
    end
  end
end
