import React from 'react';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import OrdersList from './OrdersList';
import { getArchivedOrdersPage } from '../actions/api';
import { UserShape, OrderShape } from './shapes';

export default class ArchivedOrders extends React.Component {
  static propTypes = {
    currentUser: UserShape.isRequired,
    orders: PropTypes.arrayOf(OrderShape).isRequired,
    pageCount: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      orders: props.orders,
      pageCount: props.pageCount
    };
    this.getPage = this.getPage.bind(this);
  }

  getPage(data) {
    const number = +data.selected + 1;
    getArchivedOrdersPage(number).then((response) => {
      this.setState({
        orders: response.data.orders,
        pageCount: response.data.page_count
      });
    });
  }

  render() {
    return (
      <div>
        <h2>Archived orders</h2>
        <OrdersList orders={this.state.orders} archived currentUser={this.props.currentUser} />
        <div className="text-center">
          <ReactPaginate pageCount={this.state.pageCount}
                         marginPagesDisplayed={2}
                         pageRangeDisplayed={5}
                         onPageChange={this.getPage}
                         breakLabel={<a>...</a>}
                         breakClassName={'break-me'}
                         containerClassName={'pagination'}
                         subContainerClassName={'pages pagination'}
                         activeClassName={'active'} />
        </div>
      </div>
    );
  }
}
