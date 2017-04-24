import React from 'react';

const Order = ({ order, currentUser }) => (
  <li className="panel panel-default">
    <div className="panel-body">
      {order.attributes.restaurant} by
      {order.attributes.owner.id == currentUser.id ? ' You' : ` ${order.attributes.owner.name}`}
    </div>
  </li>
)
export default Order;

