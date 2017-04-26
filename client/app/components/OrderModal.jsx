import React from 'react';
import { Modal } from 'react-bootstrap';
import bindAll from 'lodash/bindAll';
import PropTypes from 'prop-types';
import LineItemForm from './LineItemForm';
import LineItem from './LineItem';

export default class OrderModal extends React.Component {
  static propTypes = {
    order: PropTypes.object.isRequired,
    closeModal: PropTypes.func.isRequired,
    showModal: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      showForm: this.shouldRenderForm(),
      sumOfItems: this.sumOfLineItems()
    };
    bindAll(this, ['handleClose']);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      showForm: this.shouldRenderForm(nextProps),
      sumOfItems: this.sumOfLineItems(nextProps.order.attributes['line-items'])
    });
  }

  handleClose() {
    this.props.closeModal();
  }

  shouldRenderForm(props = this.props) {
    return !(props.order.attributes['line-items'].some(
      (elem) => +elem.user.id === +props.currentUser.id
    ));
  }

  sumOfLineItems(lineItems = this.props.order.attributes['line-items']) {
    return lineItems.reduce((mem, li) => mem + (li.cost / 100), 0).toFixed(2);
  }

  render() {
    return (
      <Modal show={this.props.showModal} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.order.attributes.restaurant}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.order.attributes['line-items'].map(li =>
            <span key={li.id}>{li.id}</span>
          )}
          <p>
            Sum: {this.state.sumOfItems}
          </p>
          {this.state.showForm && <LineItemForm order={this.props.order} show={this.shouldRenderForm()} />}
        </Modal.Body>
      </Modal>
    );
  }
}
