import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import OrderFactory from 'test/factories/Order';

describe('<LineItemForm />', () => {
  const createSpy = sinon.spy();
  const LineItemForm = proxyquire.noCallThru().load('../../app/components/LineItemForm', {
    '../actions/api': {
      createLineItem: createSpy
    }
  }).default;
  const order = OrderFactory.build();
  const wrapper = mount(<LineItemForm order={order} />);

  it('renders form', () => {
    expect(wrapper).to.have.exactly(1).descendants('form');
  });

  it('renders 2 inputs', () => {
    expect(wrapper.find('form')).to.have.exactly(2).descendants('input');
  });

  describe('Sending create request', () => {
    const state = {
      name: 'asdf',
      cost: 3.14
    };
    before(() => {
      wrapper.setState(state);
      wrapper.find('form').simulate('submit');
    });

    it('sends request', () => {
      const { name, cost } = state;
      expect(createSpy).to.have.been.calledOnce();
      expect(createSpy).to.have.been.calledWithMatch({ name, cost: cost * 100 }, order.id);
    });
  });
});
