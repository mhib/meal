FactoryGirl.define do
  factory :order do
    association :owner, factory: :user
    status :open
    sequence :restaurant do |n|
      "restaurant##{n}"
    end
  end
end
