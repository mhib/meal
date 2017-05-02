class Order < ApplicationRecord
  STATUSES = Hash[%i[open finalized ordered delivered].each_with_index.to_a].freeze
  enum status: STATUSES

  validates :owner, presence: true
  validates :restaurant, presence: true, length: { in: 1..255 }
  validates :status, presence: true

  belongs_to :owner, foreign_key: :owner_id,
                     class_name: 'User'
  has_many :line_items

  scope :today, (-> { where('created_at >= ?', Time.zone.now.beginning_of_day) })
  scope :not_today, (-> { where('created_at < ?', Time.zone.now.beginning_of_day) })

  paginates_per 5

  def today?
    created_at >= Time.zone.now.beginning_of_day
  end
end
