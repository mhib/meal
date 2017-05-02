require 'rails_helper'

RSpec.describe 'LineItems', type: :request do
  describe 'POST /line_items' do
    context 'user does not already have line item' do
      let!(:user) { create(:user) }
      let!(:order) { create(:order) }
      let(:line_item_params) { attributes_for(:line_item, user_id: user.id, order_id: order.id) }
      let(:server_spy) { double(:server, broadcast: nil) }

      before do
        allow_any_instance_of(ApplicationController).to receive(:signed_in?) { true }
        allow_any_instance_of(ApplicationController).to receive(:current_user) { user }
        allow(ActionCable).to receive(:server) { server_spy }
      end

      it 'creates line item' do
        expect do
          post '/line_items.json', params: { line_item: line_item_params }
        end.to change(LineItem, :count).by(1)
        expect(LineItem.last.user).to eq user
        expect(response).to be_ok
        expect(server_spy).to have_received(:broadcast)
          .with(
            'orders:orders',
            type: 'created_line_item',
            line_item: LineItemSerializer.new(LineItem.last).as_json
          )
      end
    end

    context 'user already has a line item' do
      let!(:user) { create(:user) }
      let!(:order) { create(:order) }
      let!(:other_line_item) { create(:line_item, user: user, order: order) }
      let(:line_item_params) { attributes_for(:line_item, user_id: user.id, order_id: order.id) }
      let(:server_spy) { double(:server, broadcast: nil) }

      before do
        allow_any_instance_of(ApplicationController).to receive(:signed_in?) { true }
        allow_any_instance_of(ApplicationController).to receive(:current_user) { user }
        allow(ActionCable).to receive(:server) { server_spy }
      end

      it 'does not create line item' do
        expect do
          post '/line_items.json', params: { line_item: line_item_params }
        end.not_to change { LineItem.count }
        expect(response.status).to eq 422
        expect(ActionCable).not_to have_received(:server)
      end
    end
  end

  describe 'DELETE /line_items' do
    describe 'user is owner' do
      let!(:user) { create(:user) }
      let!(:line_item) { create(:line_item, user_id: user.id) }
      let(:server_spy) { double(:server, broadcast: nil) }

      before do
        allow_any_instance_of(ApplicationController).to receive(:signed_in?) { true }
        allow_any_instance_of(ApplicationController).to receive(:current_user) { user }
        allow(ActionCable).to receive(:server) { server_spy }
      end

      it 'destroys line item' do
        expect do
          delete '/line_items.json', params: { line_item: { id: line_item.id } }
        end.to change(LineItem, :count).by(-1)
        expect(response).to be_ok
        expect(server_spy).to have_received(:broadcast)
          .with(
            'orders:orders',
            type: 'deleted_line_item',
            line_item: LineItemSerializer.new(line_item).as_json
          )
      end
    end

    describe 'user is not an owner' do
      let!(:user) { create(:user) }
      let!(:line_item) { create(:line_item) }
      let(:server_spy) { double(:server, broadcast: nil) }

      before do
        allow_any_instance_of(ApplicationController).to receive(:signed_in?) { true }
        allow_any_instance_of(ApplicationController).to receive(:current_user) { user }
        allow(ActionCable).to receive(:server) { server_spy }
      end

      it 'does not destroy line item' do
        expect do
          delete '/line_items.json', params: { line_item: { id: line_item.id } }
        end.to raise_error(Pundit::NotAuthorizedError)
        expect(server_spy).not_to have_received(:broadcast)
      end
    end
  end
end
