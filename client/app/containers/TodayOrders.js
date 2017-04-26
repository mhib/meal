import { connect } from 'react-redux';
import OrdersList from '../components/OrdersList';

const mapStateToProps = (state) => (
  {
    orders: state.orders
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    onChangeState: (arg) => {}
  }
);

const TodayOrders = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrdersList);

export default TodayOrders;
