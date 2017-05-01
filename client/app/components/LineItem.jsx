import React from 'react';
import PropTypes from 'prop-types';
import { LineItemShape, UserShape } from './shapes';
import DeleteLineItemLink from './DeleteLineItemLink';
import './LineItem.scss';

const LineItem = ({ lineItem, archived, currentUser, status }) => (
  <div className="panel panel-default">
    <div className="panel-body">
      <span className="line-item-description">
        {lineItem.name} by {lineItem.user.name}
      </span>
      <span className="line-item-cost">
        {(lineItem.cost / 100).toFixed(2)} PLN
        {
          (!archived && lineItem.user.id === currentUser.id && status === 'open') &&
          <DeleteLineItemLink lineItem={lineItem} />
        }
      </span>
    </div>
  </div>
);

LineItem.propTypes = {
  lineItem: LineItemShape.isRequired,
  currentUser: UserShape.isRequired,
  archived: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired
};

export default LineItem;
