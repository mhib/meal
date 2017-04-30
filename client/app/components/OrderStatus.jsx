import React from 'react';
import PropTypes from 'prop-types';
import capitalize from 'lodash/capitalize';

const OrderStatus = ({ status, archived }) => (
  <div className={`order-status ${status}${archived ? '-archived' : ''}`}>
    <p>
      <span className="status-head">
        Status:&nbsp;
      </span>
      { archived ? `${capitalize(status)}(Archived)` : capitalize(status) }
    </p>
  </div>
);

OrderStatus.proptypes = {
  status: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired
};

export default OrderStatus;
