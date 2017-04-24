import React from 'react';
import Order from './Order';
import './OrdersList.scss'

const OrdersList = ({ orders, onChangeStatus, onCreateLineItem, currentUser, archived }) => (
  <ul className="ordersList">
    {orders.map(order =>
      <Order
        key={order.id}
        order={order}
        currentUser={currentUser}
        onChangestatus={() => onChangeStatus(order.id)}
        onCreateLineItem={() => onCreateLineItem(order.id)}
        archived={archived}
      />
    )}
  </ul>
)

export default OrdersList;
