FactoryGirl.define do
  factory :line_item do
    association :user
    association :order
    cost 1234
    name 'Meal'
  end
end
