import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

describe('<OrderForm />', () => {
  const createSpy = sinon.spy();
  const OrderForm = proxyquire.noCallThru().load('../../app/components/OrderForm', {
    '../actions/api': {
      createOrder: createSpy
    }
  }).default;
  const wrapper = mount(<OrderForm />);

  it('renders from', () => {
    expect(wrapper).to.have.exactly(1).descendants('form');
  });

  it('renders 1 input', () => {
    expect(wrapper.find('form')).to.have.exactly(1).descendants('input');
  });

  describe('Sending create request', () => {
    const state = {
      restaurant: 'asdf'
    };
    before(() => {
      wrapper.setState(state);
      wrapper.find('form').simulate('submit');
    });

    it('sends request', () => {
      expect(createSpy).to.have.been.calledOnce();
      expect(createSpy).to.have.been.calledWith(state.restaurant);
    });
  });
});
