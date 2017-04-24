class User < ApplicationRecord
  validates :name, presence: true
  validates :uid, presence: true, uniqueness: { scope: :provider }
  validates :provider, presence: true

  has_many :orders, foreign_key: :owner_id

  def self.find_or_create_by_oauth(auth)
    if (found = where(provider: auth[:provider], uid: auth[:uid]).first)
      found.tap { |f| f.update_name_from_oauth(auth) }
    else
      create!(
        provider: auth[:provider],
        uid: auth[:uid],
        name: auth.dig(:info, :name) || auth[:uid]
      )
    end
  end

  def update_name_from_oauth(auth)
    name_from_auth = auth.dig(:info, :name)
    if name_from_auth && name_from_auth != name
      update_attribute(:name, name_from_auth)
    end
    self
  end
end
