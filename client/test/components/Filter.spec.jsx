import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { Checkbox } from 'react-bootstrap';
import Filter from 'app/components/Filter';

describe('<Filter />', () => {
  const changeSpy = sinon.spy();
  const name = 'open';
  const wrapper = shallow(<Filter enabled name={name} onToggle={changeSpy} />);

  it('rendes checkbox', () => {
    expect(wrapper).to.have.exactly(1).descendants(Checkbox);
    expect(wrapper.html()).to.include(name);
  });

  describe('toggling', () => {
    it('calls onToggle', () => {
      wrapper.find(Checkbox).simulate('change');
      expect(changeSpy).to.have.been.calledOnce();
    });
  });
});
