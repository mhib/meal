import PropTypes from 'prop-types';

export const UserShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
});

export const LineItemShape = PropTypes.shape({
  cost: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  order_id: PropTypes.number.isRequired,
  user: UserShape
});

export const OrderShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  restaurant: PropTypes.string.isRequired,
  owner: UserShape,
  line_items: PropTypes.arrayOf(LineItemShape).isRequired
});
