require 'rails_helper'

RSpec.describe User, type: :model do
  describe '.find_or_create_by_oauth(auth)' do
    context 'user not found' do
      let(:user) { FactoryGirl.build(:user) }
      let(:auth) do
        {
          provider: user.provider,
          uid: user.uid,
          info: { name: user.name }
        }
      end

      it 'creates user with correct attributes' do
        expect do
          User.find_or_create_by_oauth(auth)
        end.to change { User.count }.by(1)
        %i(provider uid name).each do |n|
          expect(User.last.public_send n).to eq user.public_send(n)
        end
      end
    end

    context 'user found' do
      let!(:user) { FactoryGirl.create(:user) }
      context 'name not changed' do
        let(:auth) do
          {
            provider: user.provider,
            uid: user.uid,
            info: { name: user.name }
          }
        end

        it 'returns user' do
          expect(User.find_or_create_by_oauth(auth)).to eq user
        end
      end

      context 'name changed' do
        let(:auth) do
          {
            provider: user.provider,
            uid: user.uid,
            info: { name: (user.name + '1') }
          }
        end

        it 'returns user and changes name' do
          expect(User.find_or_create_by_oauth(auth)).to eq user
          expect(User.last.name).to eq auth[:info][:name]
        end
      end
    end
  end
end
