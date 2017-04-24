import { connect } from 'react-redux'
import OrdersList from '../components/OrdersList'

const mapStateToProps = (state) => {
  return {
    orders: state.orders
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateLineItem: (arg) => {
      console.log(arg);
    },
    onChangeState: (arg) => {
      console.log(arg);
    }
  }
}

const TodayOrders = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrdersList);

export default TodayOrders;
