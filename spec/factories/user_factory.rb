FactoryGirl.define do
  factory :user do
    name 'Marcin Henryk Bartkowiak'
    sequence :uid do |n|
      n.to_s
    end
    provider 'github'
  end
end
