import React from 'react'
import { LineItemShape } from './shapes';
import './LineItem.scss'

const LineItem = ({ lineItem }) => (
  <div className="panel panel-default">
    <div className="panel-body">
      <span className="line-item-description">
          {lineItem.name} by {lineItem.user.name}
      </span>
      <span className="line-item-cost">
        {(lineItem.cost / 100).toFixed(2)} PLN
      </span>
    </div>
  </div>
);

LineItem.propTypes = {
  lineItem: LineItemShape.isRequired
};

export default LineItem;
