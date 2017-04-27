import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

describe('<LineItemForm />', () => {
  const createSpy = sinon.spy();
  const LineItemForm = proxyquire.noCallThru().load('../../app/components/LineItemForm', {
    '../actions/api': {
      createLineItem: createSpy
    }
  }).default;
  const wrapper = mount(<LineItemForm order={{ id: 13 }} />);

  it('renders from', () => {
    expect(wrapper).to.have.exactly(1).descendants('form');
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

    it('invokes onSuccess callback', () => {
      expect(createSpy).to.have.been.calledOnce();
      expect(createSpy).to.have.been.calledWithMatch(state, 13);
    });
  });
});
