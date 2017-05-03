import React from 'react';
import { Modal } from 'react-bootstrap';
import bindAll from 'lodash/bindAll';
import PropTypes from 'prop-types';
import without from 'lodash/without';
import { STATUSES } from '../reducers/filters';
import LineItemForm from './LineItemForm';
import LineItem from './LineItem';
import { OrderShape, UserShape } from './shapes';
import ChangeOrderStatusLink from './ChangeOrderStatusLink';
import OrderStatus from './OrderStatus';
import './OrderModal.scss';

export default class OrderModal extends React.Component {
  static propTypes = {
    order: OrderShape.isRequired,
    closeModal: PropTypes.func.isRequired,
    showModal: PropTypes.bool.isRequired,
    archived: PropTypes.bool.isRequired,
    currentUser: UserShape.isRequired
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
    return (lineItems.reduce(((mem, li) => mem + li.cost), 0) / 100).toFixed(2);
  }

  statusLinks() {
    if (!this.props.archived && this.props.order.owner.id === this.props.currentUser.id) {
      if (this.state.updating) {
        return '...';
      }
      return without(STATUSES, this.props.order.status).map((status) =>
        <ChangeOrderStatusLink key={status}
                                 order={this.props.order}
                                 status={status}
                                 handleClick={this.setUpdating} />
        );
    }
    return undefined;
  }


  render() {
    return (
      <Modal show={this.props.showModal} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.order.restaurant}</Modal.Title>
          <OrderStatus status={this.props.order.status} archived={this.props.archived} />
          {
            this.statusLinks()
          }
        </Modal.Header>
        <Modal.Body>
          <h4>Items:</h4>
          {this.props.order.line_items.map(li =>
            <LineItem lineItem={li}
                      key={li.id}
                      archived={this.props.archived}
                      currentUser={this.props.currentUser}
                      status={this.props.order.status} />
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
