class LineItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :cost, :order_id

  belongs_to :user
end
