import { connect } from 'react-redux';
import OrdersList from '../components/OrdersList';

const mapStateToProps = (state) => (
  {
    orders: state.orders.filter((order) => state.filters.get(order.status))
  }
);

const TodayOrders = connect(
  mapStateToProps
)(OrdersList);

export default TodayOrders;
