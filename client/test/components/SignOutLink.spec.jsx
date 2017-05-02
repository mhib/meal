import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Glyphicon } from 'react-bootstrap';
import SignOutLink from 'app/components/SignOutLink';

describe('<SignOutLink />', () => {
  const wrapper = shallow(<SignOutLink />);

  it('renders sign out glyphicon', () => {
    expect(wrapper).to.have.exactly(1).descendants(Glyphicon);
    expect(wrapper.find(Glyphicon).props().glyph).to.eq('log-out');
  });
});
