import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import LineItemFactory from 'test/factories/LineItem';
import UserFactory from 'test/factories/User';
import LineItem from 'app/components/LineItem';
import DeleteLineItemLink from 'app/components/DeleteLineItemLink';

describe('<LineItem />', () => {
  it('shows item info', () => {
    const item = LineItemFactory.build();
    const user = UserFactory.build();
    const wrapper = shallow(<LineItem lineItem={item} currentUser={user} archived={false} status="open" />);
    expect(wrapper.text()).to.include(item.name);
    expect(wrapper.text()).to.include((item.cost / 100).toFixed(2));
    expect(wrapper.text()).to.include(item.user.name);
  });

  describe('rendering DeleteLineItemLink', () => {
    describe('archived', () => {
      const item = LineItemFactory.build();
      const wrapper = shallow(<LineItem lineItem={item} currentUser={item.user} archived status="open" />);
      it('does not render DeleteLineItemLink', () => {
        expect(wrapper).not.to.have.descendants(DeleteLineItemLink);
      });
    });
    describe('order not open', () => {
      const item = LineItemFactory.build();
      const wrapper = shallow(<LineItem lineItem={item} currentUser={item.user} archived={false} status="finalized" />);
      it('does not render DeleteLineItemLink', () => {
        expect(wrapper).not.to.have.descendants(DeleteLineItemLink);
      });
    });
    describe('other user', () => {
      const item = LineItemFactory.build();
      const user = UserFactory.build();
      const wrapper = shallow(<LineItem lineItem={item} currentUser={user} archived={false} status="open" />);
      it('does not render DeleteLineItemLink', () => {
        expect(wrapper).not.to.have.descendants(DeleteLineItemLink);
      });
    });

    describe('user has permission', () => {
      const item = LineItemFactory.build();
      const wrapper = shallow(<LineItem lineItem={item} currentUser={item.user} archived={false} status="open" />);
      it('renders DeleteLineItemLink', () => {
        expect(wrapper).to.have.exactly(1).descendants(DeleteLineItemLink);
      });
    });
  });
});
