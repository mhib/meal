import orders from 'app/reducers/orders';
import { expect } from 'chai';
import sample from 'lodash/sample';
import cloneDeep from 'lodash/cloneDeep';
import OrderFactory from 'test/factories/Order';
import LineItemFactory from 'test/factories/LineItem';

describe('orders', () => {
  describe('CREATED_ORDER', () => {
    it('adds order to state', () => {
      const state = [OrderFactory.build()];
      const order = OrderFactory.build();
      const res = orders(state, { type: 'CREATED_ORDER', order });
      expect(res[0]).to.eq(order);
      expect(res[1]).to.eq(state[0]);
      expect(res.length).to.eq(state.length + 1);
    });
  });

  describe('CREATED_LINE_ITEM', () => {
    it('adds order to state', () => {
      const state = OrderFactory.buildList(10);
      const item = LineItemFactory.build();
      item.order_id = +sample(state).id;
      const res = orders(state, { type: 'CREATED_LINE_ITEM', lineItem: item });
      expect(res.find((e) => +e.id === item.order_id).line_items)
        .to.include(item);
    });
  });

  describe('CHANGED_ORDER_STATUS', () => {
    it('changes order status', () => {
      const state = OrderFactory.buildList(10);
      const order = cloneDeep(state[3]);
      order.status = 'finalized';
      const res = orders(state, { type: 'CHANGED_ORDER_STATUS', order });
      expect(res.find((e) => e.id === order.id).status)
        .to.eq('finalized');
    });

    it('sorts orders', () => {
      const state = OrderFactory.buildList(10);
      const order = cloneDeep(state[3]);
      order.status = 'finalized';
      const res = orders(state, { type: 'CHANGED_ORDER_STATUS', order });
      expect(res.findIndex((e) => e.id === order.id))
        .to.eq(state.length - 1);
    });
  });

  describe('DELETED_LINE_ITEM', () => {
    const state = OrderFactory.buildList(10);
    const order = state[3];
    const lineItem = LineItemFactory.build({ order_id: order.id });
    order.line_items.push(lineItem);

    it('deletes line item', () => {
      expect(order.line_items.some((e) => e.id === lineItem.id)).to.eq(true);
      const res = orders(state, { type: 'DELETED_LINE_ITEM', lineItem });
      const foundOrder = res.find((e) => e.id === order.id);
      expect(foundOrder.line_items.some((e) => e.id === lineItem.id)).to.eq(false);
    });
  });
});
