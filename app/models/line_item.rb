class LineItem < ApplicationRecord
  belongs_to :order, counter_cache: true
  belongs_to :user

  validates :user, presence: true
  validates :order, presence: true
  validates :order_id, uniqueness: { scope: :user_id }
  validates :cost, presence: true
end
