require 'rails_helper'

RSpec.describe "LineItems", type: :request do
  describe "POST /line_items" do
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
          post '/line_items.json', params: {line_item: line_item_params}
        end.to change { LineItem.count }.by(1)
        expect(LineItem.last.user).to eq user
        expect(response).to be_ok
        expect(server_spy).to have_received(:broadcast).
          with(
            'orders:orders',
            {
              type: 'created_line_item',
              line_item: LineItemSerializer.new(LineItem.last).as_json
            }
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
          post '/line_items.json', params: {line_item: line_item_params}
        end.not_to change { LineItem.count }
        expect(response.status).to eq 422
        expect(ActionCable).not_to have_received(:server)
      end
    end
  end
end
