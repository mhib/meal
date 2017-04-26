import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { createStore } from 'redux';
import { ORDERS_CHANNEL, createSubscription } from '../cable';
import { createOrder, createLineItem } from '../actions/orders';
import mealApp from '../reducers/index';
import App from './App';

export default class AppContainer extends React.Component {
  static propTypes = {
    current_user: PropTypes.object.isRequired,
    archived: PropTypes.array.isRequired,
    today: PropTypes.array.isRequired,
    archived_page_count: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.store = createStore(mealApp,
      {
        orders: this.props.today
      });
    this.handleWebSocketStream = this.handleWebSocketStream.bind(this);
    createSubscription(ORDERS_CHANNEL, this.handleWebSocketStream);
  }

  handleWebSocketStream(params) {
    switch (params.type) {
      case 'created_order':
        this.store.dispatch(createOrder(params.order.data));
        break;
      case 'created_line_item':
        this.store.dispatch(createLineItem(params.line_item));
        break;
      default:
    }
  }

  render() {
    return (<Provider store={this.store}>
      <App currentUser={this.props.current_user}
           archived={this.props.archived}
           archivedPageCount={this.props.archived_page_count} />
    </Provider>);
  }
}
