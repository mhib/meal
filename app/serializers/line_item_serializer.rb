class LineItemSerializer < ActiveModel::Serializer
  attributes :user, :name, :cost
end
