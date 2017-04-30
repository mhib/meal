import React from 'react';
import PropTypes from 'prop-types';
import capitalize from 'lodash/capitalize'
import { updateOrderStatus } from '../actions/api';
import { OrderShape } from './shapes';

export default class ChangeOrderStatusLink extends React.Component {
  static propTypes = {
    order: OrderShape.isRequired,
    status: PropTypes.string.isRequired,
    handleClick: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleClick();
    updateOrderStatus(this.props.status, this.props.order.id);
  }

  render() {
    return (
      <a className={`order-status-link ${this.props.status}`} onClick={this.handleSubmit} href="#">{capitalize(this.props.status)}!</a>
    );
  }
}
