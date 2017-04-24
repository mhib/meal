require 'rails_helper'

RSpec.describe OrderPolicy do
  subject { described_class }

  permissions :create?, :archived_page? do
    context 'current_user' do
      let(:user) { build(:user) }

      it 'grants access' do
        expect(subject).to permit(user, nil)
      end
    end

    context 'no current user' do
      it 'denies access' do
        expect(subject).not_to permit(nil, nil)
      end
    end
  end

  permissions :update? do
    context 'owner' do
      let(:order) { create(:order) }
      it 'grants access' do
        expect(subject).to permit(order.owner, order)
      end
    end

    context 'not an owner' do
      let(:order) { create(:order) }
      let(:other_user) { create(:user) }

      it 'denies access' do
        expect(subject).not_to permit(other_user, order)
      end
    end
  end
end
