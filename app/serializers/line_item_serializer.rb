class LineItemSerializer < ActiveModel::Serializer
  attributes :user, :name, :cost, :order_id
end
