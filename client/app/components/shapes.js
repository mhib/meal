import PropTypes from 'prop-types';

export const UserShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  uid: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
});

export const LineItemShape = PropTypes.shape({
  cost: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  order_id: PropTypes.number.isRequired,
  user: UserShape
});

export const OrderShape = PropTypes.shape({
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  attributes: PropTypes.shape({
    status: PropTypes.string.isRequired,
    restaurant: PropTypes.string.isRequired,
    owner: UserShape,
    LineItems: PropTypes.arrayOf(LineItemShape)
  })
});
