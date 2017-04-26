import React from 'react';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import bindAll from 'lodash/bindAll';
import { createOrder } from '../actions/api';

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
    this.form.reset();
  }

  render() {
    return (
      <div>
        <h2>Create new order</h2>
        <form onSubmit={this.handleSubmit} ref={(node) => this.form = node}>
          <FormGroup>
            <FormControl
            type="text"
            name="restaurant"
            required="true"
            maxLength="255"
            onChange={this.handleInputChange}
            placeholder="Restaurant" />
          </FormGroup>
          <Button bsStyle="primary" type="submit" disabled={!this.state.restaurant}>
            Create order
          </Button>
        </form>
      </div>
    );
  }
}
