class OrderSerializer < ActiveModel::Serializer
  attributes :restaurant, :status, :id, :line_items

  def line_items
    object.line_items.map do |line_item|
      LineItemSerializer.new(line_item).as_json
    end
  end

  belongs_to :owner, serializer: UserSerializer
end
