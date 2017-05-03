import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import FiltersList from 'app/components/FiltersList';
import { DEFAULT_STATE } from 'app/reducers/filters';

describe('<FiltersList />', () => {
  const filters = DEFAULT_STATE;
  const wrapper = shallow(<FiltersList filters={filters} onToggle={() => {}} />);

  it('lists orders', () => {
    expect(wrapper).to.have.exactly(DEFAULT_STATE.length).descendants('Filter');
  });
});
