class CreateLineItems < ActiveRecord::Migration[5.0]
  def change
    create_table :line_items do |t|
      t.belongs_to :order, foreign_key: true, null: false
      t.belongs_to :user, foreign_key: true, null: false
      t.string :name, null: false
      t.integer :cost, null: false

      t.timestamps
    end
  end
end
