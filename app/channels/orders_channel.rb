class OrdersChannel < ApplicationCable::Channel
  def subscribed
    stream_for 'orders'
  end
end
