import React from 'react'
import OrderForm from './OrderForm'
import TodayOrders from '../containers/TodayOrders'
import ArchivedOrders from '../components/ArchivedOrders'

const App = (props) => (
  <div className="row">
    <div className="col-md-12">
      <div className="row">
        <div className="col-md-12">
          <OrderForm />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <TodayOrders currentUser={props.currentUser}/>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <ArchivedOrders orders={props.archived} pageCount={props.archivedPageCount} currentUser={props.currentUser} />
        </div>
      </div>
    </div>
  </div>
)

export default App
