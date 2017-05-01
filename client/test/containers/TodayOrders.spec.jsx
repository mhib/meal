import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import clone from 'lodash/clone';
import TodayOrders from 'app/containers/TodayOrders';
import mealApp from 'app/reducers/index';
import { changeOrderStatus } from 'app/actions/orders';
import OrderFactory from '../factories/Order';
import UserFactory from '../factories/User';

describe('<TodayOrders />', () => {
  const user = UserFactory.build();
  let store;
  let wrapper;
  beforeEach(() => {
    store = createStore(mealApp,
      {
        filters: new Map([['open', true], ['finalized', false]]),
        orders: OrderFactory.buildList(5)
      }
    );
    wrapper = mount(<Provider store={store}><TodayOrders currentUser={user} /></Provider>);
  });

  it('lists filters', () => {
    expect(wrapper).to.have.exactly(5).descendants('Order');
  });

  describe('filtering orders', () => {
    let order;
    beforeEach(() => {
      order = clone(store.getState().orders[3]);
      order.status = 'finalized';
      store.dispatch(changeOrderStatus(order));
    });
    it('does not have filtered out orders', () => {
      expect(wrapper).to.have.exactly(4).descendants('Order');
      expect(wrapper.html()).not.to.include(order.restaurant);
    });
  });
});
