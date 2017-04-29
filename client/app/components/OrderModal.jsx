import React from 'react';
import { Modal } from 'react-bootstrap';
import bindAll from 'lodash/bindAll';
import PropTypes from 'prop-types';
import LineItemForm from './LineItemForm';
import LineItem from './LineItem';
import { OrderShape } from './shapes';
import ChangeOrderStatusLink from './ChangeOrderStatusLink';
import OrderStatus from './OrderStatus';
import './OrderModal.scss';

const STATUSES = ['open', 'finalized', 'ordered', 'delivered'];

export default class OrderModal extends React.Component {
  static propTypes = {
    order: OrderShape.isRequired,
    closeModal: PropTypes.func.isRequired,
    showModal: PropTypes.bool.isRequired,
    archived: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      showForm: this.shouldRenderForm(),
      sumOfItems: this.sumOfLineItems(),
      updatingStatus: false
    };
    bindAll(this, ['handleClose', 'setUpdating']);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      showForm: this.shouldRenderForm(nextProps),
      sumOfItems: this.sumOfLineItems(nextProps.order.line_items),
      updating: false
    });
  }

  handleClose() {
    this.props.closeModal();
  }

  setUpdating() {
    this.setState({ updating: true });
  }

  shouldRenderForm(props = this.props) {
    return props.order.status === 'open' &&
      !props.archived &&
      !(props.order.line_items.some(
        (elem) => +elem.user.id === +props.currentUser.id
      ));
  }

  sumOfLineItems(lineItems = this.props.order.line_items) {
    return (lineItems.reduce((mem, li) => mem + li.cost, 0) / 100).toFixed(2);
  }

  render() {
    return (
      <Modal show={this.props.showModal} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.order.restaurant}</Modal.Title>
          <OrderStatus status={this.props.order.status} archived={this.props.archived} />
          {
            !this.props.archived &&
            (this.state.updating ? '...' :
            STATUSES.filter((s) => s !== this.props.order.status).map((status) =>
              <span key={status}>
                <ChangeOrderStatusLink order={this.props.order}
                                       status={status}
                                       handleClick={this.setUpdating} />, 
              </span>
            ))
          }
        </Modal.Header>
        <Modal.Body>
          <h4>Items:</h4>
          {this.props.order.line_items.map(li =>
            <LineItem lineItem={li} key={li.id} />
          )}
          <p className="sum-of-costs">
            Sum: {this.state.sumOfItems} PLN
          </p>
          {this.state.showForm && <LineItemForm order={this.props.order} show={this.shouldRenderForm()} />}
        </Modal.Body>
      </Modal>
    );
  }
}
