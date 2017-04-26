class LineItemSerializer < ActiveModel::Serializer
  attributes :id, :user, :name, :cost, :order_id
end
