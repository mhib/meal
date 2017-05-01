import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import OrderFactory from 'test/factories/Order';
import UserFactory from 'test/factories/User';
import OrdersList from 'app/components/OrdersList';

describe('<OrdersList />', () => {
  const orderCount = 10;
  const orders = OrderFactory.buildList(orderCount);
  const user = UserFactory.build()
  const wrapper = shallow(<OrdersList orders={orders} currentUser={user} /> );

  it('lists orders', () => {
    expect(wrapper).to.have.exactly(orderCount).descendants('Order');
  });

  describe('no orders', () => {
    it('renders no orders info', () => {
      expect(shallow(<OrdersList orders={[]} currentUser={user} />))
        .to.include.text('No orders');
    });
  });
});
