class OrdersChannel < ApplicationCable::Channel
  CHANNEL_NAME = 'orders:orders'.freeze

  def subscribed
    stream_for 'orders'
  end
end
