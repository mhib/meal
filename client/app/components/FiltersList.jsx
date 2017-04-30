import React from 'react';
import PropTypes from 'prop-types';
import Filter from './Filter';
import './filters.scss';

const FiltersList = ({ filters, onToggle }) => (
  <div className="filters">
    {
      Array.from(filters.entries()).map(([name, value]) => (
        <Filter key={name} name={name} enabled={value} onToggle={() => onToggle(name)} />
      ))
    }
  </div>
);

FiltersList.proptypes = {
  filters: PropTypes.instanceOf(Map).isRequired,
  onToggle: PropTypes.func.isRequired
};

export default FiltersList;
