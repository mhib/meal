import React from 'react';
import PropTypes from 'prop-types';
import Order from './Order';
import './OrdersList.scss';
import { UserShape, OrderShape } from './shapes';

const OrdersList = ({ orders, currentUser, archived }) => (
  <div className="orders-list">
    {
    orders.length === 0 ? <h4>No orders</h4> :
    orders.map(order =>
      <Order
            key={order.id}
            order={order}
            currentUser={currentUser}
            archived={archived} />
    )
  }
  </div>
);

OrdersList.defaultProps = {
  archived: false
};

OrdersList.propTypes = {
  orders: PropTypes.arrayOf(OrderShape).isRequired,
  currentUser: UserShape.isRequired,
  archived: PropTypes.bool
};

export default OrdersList;
