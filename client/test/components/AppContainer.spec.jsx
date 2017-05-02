import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import OrderFactory from 'test/factories/Order';
import UserFactory from 'test/factories/User';
import TodayOrders from 'app/containers/TodayOrders';

describe('<AppContainer />', () => {
  const subSpy = sinon.spy();
  const AppContainer = proxyquire.noCallThru().load('../../app/components/AppContainer', {
    '../cable': {
      createSubscription: subSpy
    }
  }).default;

  const today = OrderFactory.buildList(10);
  const archived = OrderFactory.buildList(10);
  const archivedPageCount = 2;
  const user = UserFactory.build();
  const shallowWrapper = mount(<AppContainer today={today}
                                             archived={archived}
                                             current_user={user}
                                             archived_page_count={archivedPageCount} />);
  it('renders SignOutLink', () => {
    expect(shallowWrapper).to.have.exactly(1).descendants('SignOutLink');
  });

  it('renders FiltersList', () => {
    expect(shallowWrapper).to.have.exactly(1).descendants('FiltersList');
  });

  it('renders OrderForm', () => {
    expect(shallowWrapper).to.have.exactly(1).descendants('OrderForm');
  });

  it('renders TodayOrders', () => {
    expect(shallowWrapper).to.have.exactly(1).descendants(TodayOrders);
  });

  it('renders ArchivedOrders', () => {
    expect(shallowWrapper).to.have.exactly(1).descendants('ArchivedOrders');
  });

  it('subscribes to websockets', () => {
    expect(subSpy).to.have.been.calledOnce();
  });
});
