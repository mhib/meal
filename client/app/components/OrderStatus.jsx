import React from 'react';
import PropTypes from 'prop-types';
import capitalize from 'lodash/capitalize';

const OrderStatus = ({ status, archived }) => (
  <p className={`order-status ${status}`}>
    { archived ? `${capitalize(status)}(Archived)` : capitalize(status) }
  </p>
);

OrderStatus.proptypes = {
  status: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired
};

export default OrderStatus;
