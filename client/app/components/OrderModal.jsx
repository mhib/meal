import React from 'react';
import { Modal } from 'react-bootstrap';
import LineItemForm from './LineItemForm';
import LineItem from './LineItem';
import bindAll from 'lodash/bindAll';

export default class OrderModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: this.shouldRenderForm(),
      sumOfItems: this.sumOfLineItems(props.order.attributes['line-items'])
    }
    bindAll(this, ['handleClose']);
  }

  handleClose() {
    this.props.closeModal();
  }

  shouldRenderForm(props = this.props) {
    return !(props.order.attributes['line-items'].some(
      (elem) => +elem.user.id === +props.currentUser.id
    ));
  }

  sumOfLineItems(lineItems) {
    return lineItems.reduce((mem, li) => mem + (li.cost / 100), 0).toFixed(2);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      showForm: this.shouldRenderForm(nextProps),
      sumOfItems: this.sumOfLineItems(nextProps.order.attributes['line-items'])
    });
  }

  render() {
    return(
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
      {this.state.showForm && <LineItemForm order={this.props.order} show={this.shouldRenderForm()}/>}
      </Modal.Body>
      </Modal>
    )
  }
}
