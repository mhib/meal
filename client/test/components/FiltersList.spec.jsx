import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import FiltersList from 'app/components/FiltersList';

describe('<FiltersList />', () => {
  const filters = new Map(['open', 'finalized', 'ordered', 'delivered'].map((o) => (
      [o, true]
    )));
  const wrapper = shallow(<FiltersList filters={filters} onToggle={() => {}} /> );

  it('lists orders', () => {
    expect(wrapper).to.have.exactly(4).descendants('Filter');
  });
});
