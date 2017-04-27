import React from 'react';
import PropTypes from 'prop-types';
import OrderForm from './OrderForm';
import TodayOrders from '../containers/TodayOrders';
import ArchivedOrders from '../components/ArchivedOrders';
import { UserShape, OrderShape } from './shapes';

const App = ({ currentUser, archived, archivedPageCount }) => (
  <div className="row">
    <div className="col-md-12">
      <div className="row">
        <div className="col-md-12">
          <OrderForm />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <TodayOrders currentUser={currentUser} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <ArchivedOrders orders={archived} pageCount={archivedPageCount} currentUser={currentUser} />
        </div>
      </div>
    </div>
  </div>
);

App.propTypes = {
  currentUser: UserShape.isRequired,
  archived: PropTypes.arrayOf(OrderShape).isRequired,
  archivedPageCount: PropTypes.number.isRequired
};

export default App;
