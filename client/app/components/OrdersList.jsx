import React from 'react';
import PropTypes from 'prop-types';
import Order from './Order';
import './OrdersList.scss';
import { UserShape, OrderShape } from './shapes';

const OrdersList = ({ orders, onChangeStatus, onCreateLineItem, currentUser, archived }) => (
  <ul className="ordersList">
    {orders.map(order =>
      <Order
        key={order.id}
        order={order}
        currentUser={currentUser}
        onChangestatus={() => onChangeStatus(order.id)}
        onCreateLineItem={() => onCreateLineItem(order.id)}
        archived={archived} />
    )}
  </ul>
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
