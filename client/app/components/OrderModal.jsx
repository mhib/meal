import React from 'react';
import { Modal } from 'react-bootstrap';
import LineItemForm from './LineItemForm';

export default class OrderModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.props.closeModal();
  }

  render() {
    return(
      <Modal show={this.props.showModal} onHide={this.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{this.props.order.attributes.restaurant}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
    {this.props.order.relationships['line-items'].data.map(li =>
      <span key={li.id}>{li.id}</span>
    )}
        <LineItemForm order={this.props.order} />
      </Modal.Body>
      </Modal>
    )
  }
}
