import React from 'react';
import OrdersList from './OrdersList';
import ReactPaginate from 'react-paginate';
import { getArchivedOrdersPage } from '../actions/api';

export default class ArchivedOrders extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.pageCount)
    this.state = {
      orders: props.orders,
      pageCount: props.pageCount
    };
    this.getPage = this.getPage.bind(this);
  }

  getPage(data) {
    let number = +data.selected + 1;
    getArchivedOrdersPage(number).then((response) => {
      this.setState({
        orders: response.data.orders,
        pageCount: response.data.page_count
      });
    });
  }

  render() {
    return(
      <div>
        <h2>Archived orders</h2>
        <OrdersList orders={this.state.orders} archived={true} currentUser={this.props.currentUser} />
        <ReactPaginate pageCount={this.state.pageCount}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       onPageChange={this.getPage}
                       breakLabel={<a>...</a>}
                       breakClassName={"break-me"}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} />
      </div>
    )
  }
}
