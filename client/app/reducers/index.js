import { combineReducers } from 'redux';
import orders from './orders';
import filters from './filters';

const mealApp = combineReducers({
  orders,
  filters
});

export default mealApp;
