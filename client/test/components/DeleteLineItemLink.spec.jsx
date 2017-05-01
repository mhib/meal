import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import { Glyphicon } from 'react-bootstrap';
import LineItemFactory from 'test/factories/LineItem';

describe('<DeleteLineItemLink />', () => {
  const changeSpy = sinon.spy();
  const DeleteLineItemLink = proxyquire.noCallThru().load('../../app/components/DeleteLineItemLink', {
    '../actions/api': {
      deleteLineItem: changeSpy
    }
  }).default;
  const lineItem = LineItemFactory.build();
  const wrapper = mount(<DeleteLineItemLink lineItem={lineItem} />);

  it('renders glyphicon', () => {
    expect(wrapper).to.have.exactly(1).descendants(Glyphicon);
  });

  describe('Sending create request', () => {
    before(() => {
      wrapper.find('a').simulate('click');
    });

    it('sends request', () => {
      expect(changeSpy).to.have.been.calledOnce();
      expect(changeSpy).to.have.been.calledWithMatch(lineItem);
    });
  });
});
