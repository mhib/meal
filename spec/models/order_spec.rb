require 'rails_helper'

RSpec.describe Order, type: :model do
  describe 'validation' do
    it { is_expected.to validate_presence_of(:owner) }
    it { is_expected.to validate_presence_of(:restaurant) }
    it { is_expected.to validate_length_of(:restaurant).is_at_most(255) }
    it { is_expected.to validate_presence_of(:status) }
  end
end
