require 'rails_helper'

RSpec.describe LineItem, type: :model do
  describe 'validation' do
    it { is_expected.to validate_presence_of :user }
    it { is_expected.to validate_presence_of :order }
    it { is_expected.to validate_presence_of :cost }
  end
end
