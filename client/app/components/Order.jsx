import React from 'react';
import bindAll from 'lodash/bindAll';
import PropTypes from 'prop-types';
import OrderModal from './OrderModal';

export default class Order extends React.Component {
  static propTypes = {
    order: PropTypes.object,
    currentUser: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.showModal = this.showModal.bind(this);
    bindAll(this, ['showModal', 'hideModal']);
  }

  showModal() {
    this.setState({ showModal: true });
  }

  hideModal() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <li className="panel panel-default" onClick={this.showModal}>
        <div className="panel-body">
          {this.props.order.attributes.restaurant} by
          {+this.props.order.attributes.owner.id === +this.props.currentUser.id ?
              ' You' :
              ` ${this.props.order.attributes.owner.name}`}
        </div>
        <OrderModal showModal={this.state.showModal}
                    order={this.props.order}
                    closeModal={this.hideModal}
                    currentUser={this.props.currentUser} />
      </li>
    );
  }
}

