import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import cloneDeep from 'lodash/cloneDeep';
import ReactPaginate from 'react-paginate';
import OrderFactory from 'test/factories/Order';
import UserFactory from 'test/factories/User';

describe('<ArchivedOrders />', () => {
  const getStub = (num) => {
    return {
      then: (func) => {
        const order = cloneDeep(OrderFactory.build());
        order.restaurant = 'Unique name';
        return func({
          data: {
            orders: [order],
            page_count: 2
          }
        })
      }
    };
  };
  const ArchivedOrders = proxyquire.noCallThru().load('../../app/components/ArchivedOrders', {
    '../actions/api': {
      getArchivedOrdersPage: getStub
    }
  }).default;
  const orderCount = 10;
  const orders = OrderFactory.buildList(orderCount);
  const user = UserFactory.build()
  const wrapper = shallow(<ArchivedOrders orders={orders} currentUser={user} pageCount={2} /> );

  it('renders OrdersList', () => {
    expect(wrapper).to.have.exactly(1).descendants('OrdersList');
  });

  it('renders Pagination', () => {
    expect(wrapper).to.have.exactly(1).descendants(ReactPaginate);
  });

  describe('getting other page', () => {
    const mountWrapper = mount(<ArchivedOrders orders={orders} currentUser={user} pageCount={2} /> );
    before(() => {
      mountWrapper.find('.next').find('a').simulate('click');
    });

    it('requests orders', () => {
      expect(mountWrapper.text()).to.include('Unique name');
    })
  });
});
