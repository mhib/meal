import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import OrderFactory from 'test/factories/Order';
import UserFactory from 'test/factories/User';
import Order from 'components/Order';
import OrderModal from 'components/OrderModal';

describe('<Order />', () => {
  const order = OrderFactory.build();
  const user = UserFactory.build();
  const shallowWrapper = shallow(<Order order={order} currentUser={user} archived={false} />);

  it('renders order', () => {
    expect(shallowWrapper).to.have.exactly(1).descendants('.orders-list-item');
    expect(shallowWrapper.text()).to.include(order.restaurant);
    expect(shallowWrapper.text()).to.include(`${order.owner.name}`);
  });

  describe('created by current user', () => {
    const altWrapper = shallow(<Order order={order} currentUser={order.owner} archived={false} />);

    it("does not render user's name", () => {
      expect(altWrapper.text()).not.to.include(`${order.owner.name}`);
      expect(altWrapper.text()).to.include('You');
    });
  });

  it('renders modal', () => {
    expect(shallowWrapper).to.have.exactly(1).descendants(OrderModal);
  });

  describe('on click', () => {
    before(() => {
      shallowWrapper.simulate('click');
    });

    it('shows modal', () => {
      expect(shallowWrapper.find('OrderModal').props().showModal).to.eq(true);
    });
  });
});
