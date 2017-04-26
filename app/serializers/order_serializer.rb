class OrderSerializer < ActiveModel::Serializer
  attributes :restaurant, :owner, :status, :id, :line_items

  def line_items
   object.line_items.map do |line_item|
      LineItemSerializer.new(line_item)
    end
  end
end
