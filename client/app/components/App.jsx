import React from 'react';
import PropTypes from 'prop-types';
import OrderForm from './OrderForm';
import TodayOrders from '../containers/TodayOrders';
import Filters from '../containers/Filters';
import ArchivedOrders from '../components/ArchivedOrders';
import SignOutLink from '../components/SignOutLink';
import { UserShape, OrderShape } from './shapes';

const App = ({ currentUser, archivedOrders, archivedPageCount }) => (
  <div className="row">
    <SignOutLink />
    <div className="col-md-12">
      <div className="row">
        <div className="col-md-12">
          <OrderForm />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <h2>Today orders</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <Filters />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12" id="today-orders">
          <TodayOrders currentUser={currentUser} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <ArchivedOrders orders={archivedOrders} pageCount={archivedPageCount} currentUser={currentUser} />
        </div>
      </div>
    </div>
  </div>
);

App.propTypes = {
  currentUser: UserShape.isRequired,
  archivedOrders: PropTypes.arrayOf(OrderShape).isRequired,
  archivedPageCount: PropTypes.number.isRequired
};

export default App;
