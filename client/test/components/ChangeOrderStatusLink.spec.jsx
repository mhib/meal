import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import OrderFactory from 'test/factories/Order'

describe('<ChangeOrderStatusLink />', () => {
  const changeSpy = sinon.spy();
  const handleClickSpy = sinon.spy();
  const ChangeOrderStatusLink = proxyquire.noCallThru().load('../../app/components/ChangeOrderStatusLink', {
    '../actions/api': {
      updateOrderStatus: changeSpy
    }
  }).default;
  const status = 'finalized';
  const order = OrderFactory.build();
  const wrapper = mount(<ChangeOrderStatusLink order={order} handleClick={handleClickSpy} status={status}/>);

  it('renders status', () => {
    expect(wrapper).to.include.text("Finalized");
  });

  describe('Sending create request', () => {
    before(() => {
      wrapper.find('a').simulate('click');
    });

    it('sends request', () => {
      expect(changeSpy).to.have.been.calledOnce();
      expect(changeSpy).to.have.been.calledWithMatch(status);
    });
  });
});
