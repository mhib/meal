require 'rails_helper'

RSpec.describe 'Orders', type: :request do
  describe 'POST /orders.json' do
    context 'user not signed in' do
      let(:order_params) { attributes_for(:order) }

      before do
        allow_any_instance_of(ApplicationController).to receive(:signed_in?) { false }
        allow_any_instance_of(ApplicationController).to receive(:current_user) { nil }
      end

      it 'does not allow to create order' do
        expect do
          post '/orders.json', params: { order: order_params }
        end.to raise_error(Pundit::NotAuthorizedError)
      end
    end

    context 'user signed in' do
      let!(:user) { create(:user) }
      let(:order_params) { attributes_for(:order) }
      let(:server_spy) { double(:server, broadcast: nil) }

      before do
        allow_any_instance_of(ApplicationController).to receive(:signed_in?) { true }
        allow_any_instance_of(ApplicationController).to receive(:current_user) { user }
        allow(ActionCable).to receive(:server) { server_spy }
      end

      it 'creates order' do
        expect do
          post '/orders.json', params: { order: order_params }
        end.to change(Order, :count).by(1)
        expect(Order.last.owner).to eq user
        expect(response).to be_ok
        expect(server_spy).to have_received(:broadcast)
          .with(
            'orders:orders',
            type: 'created_order', order: OrderSerializer.new(Order.last).as_json
          )
      end
    end
  end

  describe 'PATCH /orders.json' do
    context 'user is owner' do
      let(:user) { create(:user) }
      let(:order) { create(:order, owner: user) }
      let(:server_spy) { double(:server, broadcast: nil) }

      before do
        allow_any_instance_of(ApplicationController).to receive(:signed_in?) { true }
        allow_any_instance_of(ApplicationController).to receive(:current_user) { user }
        allow(ActionCable).to receive(:server) { server_spy }
      end

      it 'updates status' do
        expect do
          patch '/orders.json', params: { order: { id: order.id, status: :delivered } }
        end.to change { Order.find(order.id).status.intern }
          .from(order.status.intern).to(:delivered)
        expect(server_spy).to have_received(:broadcast)
          .with('orders:orders',
                type: 'changed_order_status',
                order: OrderSerializer.new(Order.last).as_json)
        expect(response).to be_ok
      end
    end

    context 'user is not an owner' do
      let!(:user) { create(:user) }
      let!(:order) { create(:order) }

      before do
        allow_any_instance_of(ApplicationController).to receive(:signed_in?) { true }
        allow_any_instance_of(ApplicationController).to receive(:current_user) { user }
      end

      it 'does not update order' do
        expect do
          patch '/orders.json', params: { order: { id: order.id, status: :delivered } }
        end.to raise_error(Pundit::NotAuthorizedError)
      end
    end
  end

  describe 'GET /archived_page.json' do
    context 'user signed in' do
      let!(:user) { create(:user) }
      let!(:order) { create(:order, owner: user) }

      before do
        allow_any_instance_of(ApplicationController).to receive(:signed_in?) { true }
        allow_any_instance_of(ApplicationController).to receive(:current_user) { user }
        Order.first.update_attribute(:created_at, 1.day.ago)
        get '/archived_orders/1.json'
      end

      it 'lists orders' do
        expect(response).to be_ok
        expect(response.body).to eq({
          orders: [OrderSerializer.new(order).as_json],
          page_count: 1
        }.to_json)
      end
    end

    context 'user not signed in' do
      let!(:order) { create(:order) }

      before do
        allow_any_instance_of(ApplicationController).to receive(:signed_in?) { false }
        allow_any_instance_of(ApplicationController).to receive(:current_user) { nil }
      end

      it 'does not list orders' do
        expect do
          get '/archived_orders/1.json'
        end.to raise_error(Pundit::NotAuthorizedError)
      end
    end
  end
end
