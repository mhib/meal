import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import OrderFactory from 'test/factories/Order'
import UserFactory from 'test/factories/User'
import LineItemFactory from 'test/factories/LineItem'
import OrderModal from 'components/OrderModal';
import ChangeOrderStatusLink from 'components/ChangeOrderStatusLink';

describe('<OrderModal />', () => {
  const order = OrderFactory.build();
  const user = UserFactory.build();

  it('renders modal', () => {
    expect(
      shallow(<OrderModal showModal archived={false} order={order} currentUser={user} closeModal={() => {}} />)
    ).to.have.exactly(1).descendants('Modal');
  });

  describe('archived', () => {
    const otherOrder = OrderFactory.build();
    otherOrder.line_items = [];
    otherOrder.status = 'open';
    const wrapper = mount(<OrderModal showModal archived order={otherOrder} currentUser={user} closeModal={() => {}} />);

    it('does not render form', () => {
      expect(wrapper).not.to.have.descendants('LineItemForm');
    });
  });

  describe('user already has line item', () => {
    const otherOrder = OrderFactory.build();
    otherOrder.status = 'open';
    otherOrder.line_items = [LineItemFactory.build(user: user)];
    const wrapper = mount(<OrderModal showModal archived={false} order={otherOrder} currentUser={user} closeModal={() => {}} />);
    it('does not render form', () => {
      expect(wrapper).not.to.have.descendants('LineItemForm');
    });
  });

  describe('status not open', () => {
    const otherOrder = OrderFactory.build();
    otherOrder.status = 'ordered';
    otherOrder.line_items = [];
    const wrapper = mount(<OrderModal showModal archived={false} order={otherOrder} currentUser={user} closeModal={() => {}} />);

    it('does not render form', () => {
      expect(wrapper).not.to.have.descendants('LineItemForm');
    });
  });

  describe('user is able to add line item', () => {
    const otherOrder = OrderFactory.build();
    otherOrder.line_items = [];
    otherOrder.status = 'open';
    const wrapper = shallow(<OrderModal showModal archived={false} order={otherOrder} currentUser={user} closeModal={() => {}} />);

    it('does render form', () => {
      expect(wrapper).to.have.exactly(1).descendants('LineItemForm');
    });
  });

  describe('user is an owner', () => {
    describe('archived', () => {
      const wrapper = shallow(<OrderModal archived showModal order={order} currentUser={order.owner} closeModal={() => {}} />);
      it('does not render change status links', () => {
        expect(wrapper).not.to.have.descendants(ChangeOrderStatusLink);
      });
    });

    describe('not archived', () => {
      const wrapper = shallow(<OrderModal archived={false} showModal order={order} currentUser={order.owner} closeModal={() => {}} />);
      it('renders change status links', () => {
        expect(wrapper).to.have.exactly(3).descendants(ChangeOrderStatusLink);
      });
    });
  });
  describe('user is not an owner', () => {
    const otherUser = Object.assign({}, user, { id: user.id + 3 });
    const wrapper = shallow(<OrderModal archived={false} showModal order={order} currentUser={otherUser} closeModal={() => {}} />);
    it('does not render change status links', () => {
      expect(wrapper).not.to.have.descendants(ChangeOrderStatusLink);
    });
  });
});
