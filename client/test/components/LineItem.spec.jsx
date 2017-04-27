import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import LineItemFactory from 'test/factories/LineItem';
import LineItem from 'app/components/LineItem';

describe('<LineItem />', () => {
  const item = LineItemFactory.build();
  const wrapper = shallow(<LineItem lineItem={item} /> );

  it('shows item info', () => {
    expect(wrapper.text()).to.include(item.name);
    expect(wrapper.text()).to.include((item.cost / 100).toFixed(2));
    expect(wrapper.text()).to.include(item.user.name);
  });
});
