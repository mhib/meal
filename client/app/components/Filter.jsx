import React from 'react';
import { Checkbox } from 'react-bootstrap';

import './filters.scss';

const Filter = ({ onToggle, enabled, name }) => (
  <div className={`filter ${name}`}>
    <Checkbox onChange={onToggle}
              checked={enabled}
              inline>
      {name}
    </Checkbox>
  </div>
);

Filter.propTypes = {
  onToggle: React.PropTypes.func.isRequired,
  enabled: React.PropTypes.bool.isRequired,
  name: React.PropTypes.string.isRequired
};

export default Filter;
