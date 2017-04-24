class OrderSerializer < ActiveModel::Serializer
  attributes :restaurant, :owner, :status, :id

  has_many :line_items
end
