require 'rails_helper'

RSpec.describe LineItemPolicy do
  subject { described_class }

  permissions :create? do
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

  permissions :destroy? do
    context 'owner' do
      let(:line_item) { create(:line_item) }
      it 'grants access' do
        expect(subject).to permit(line_item.user, line_item)
      end
    end

    context 'not an owner' do
      let(:line_item) { create(:line_item) }
      let(:other_user) { create(:user) }

      it 'denies access' do
        expect(subject).not_to permit(other_user, line_item)
      end
    end

    context 'order not open' do
      let(:line_item) { create(:line_item) }

      before do
        line_item.order.finalized!
      end

      it 'denies access' do
        expect(subject).not_to permit(line_item.user, line_item)
      end
    end

    context 'order not todays' do
      let(:line_item) { create(:line_item) }

      before do
        line_item.order.update_attribute(:created_at, 2.days.ago)
      end

      it 'denies access' do
        expect(subject).not_to permit(line_item.user, line_item)
      end
    end
  end
end
