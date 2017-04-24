import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { createOrder } from '../actions/api';
import bindAll from 'lodash/bindAll';

export default class OrderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { restaurant: '' };
    bindAll(this, ['handleInputChange', 'handleSubmit']);
  }

  handleInputChange(e) {
    this.setState({ restaurant: e.target.value.trim() });
  }

  handleSubmit(e) {
    e.preventDefault();
    createOrder(this.state.restaurant);
    this.setState({ restaurant: '' });
    ReactDOM.findDOMNode(this.refs.restaurantInput).value = '';
  }

  render() {
    return(
      <div>
        <h2>Create new order</h2>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <FormControl
            type="text"
            name="restaurant"
            required="true"
            maxLength="255"
            onChange={this.handleInputChange}
            placeholder="Restaurant"
            ref="restaurantInput" />
          </FormGroup>
          <Button bsStyle="primary" type="submit" disabled={!this.state.restaurant}>
            Create order
          </Button>
        </form>
      </div>
    )
  }
}
