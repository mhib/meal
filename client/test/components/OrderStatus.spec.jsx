import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import OrderStatus from 'app/components/OrderStatus';

describe('<OrdersList />', () => {
  describe('archived', () => {
    const wrapper = shallow(<OrderStatus status="finalized" archived />);
    it('containts archived notice', () => {
      expect(wrapper).to.include.text('Finalized');
      expect(wrapper).to.include.text('Archived');
    });
  });
  describe('not archived', () => {
    const wrapper = shallow(<OrderStatus status="open" />);
    it('displays status', () => {
      expect(wrapper).to.include.text('Open');
      expect(wrapper).not.to.include.text('Archived');
    });
  });
});
