import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Checkbox } from 'react-bootstrap';
import Filters from 'app/containers/Filters';
import mealApp from 'app/reducers/index';

describe('<Filters />', () => {
  let store;
  let wrapper;
  beforeEach(() => {
    store = createStore(mealApp,
      {
        filters: new Map([['open', true], ['finalized', true]])
      }
    );
    wrapper = mount(<Provider store={store}><Filters /></Provider>);
  });

  it('lists filters', () => {
    expect(wrapper).to.have.exactly(2).descendants('Filter');
  });

  describe('toggling filters', () => {
    it('toggles filter', () => {
      const filter = wrapper.find('Filter').first();
      // filter.find(Checkbox).simulate('change');
      filter.find(Checkbox).props().onChange();
      expect(store.getState().filters.get(filter.props().name)).to.eq(false);
    });
  });
});
