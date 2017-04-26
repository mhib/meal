import { combineReducers } from 'redux';
import orders from './orders';

const mealApp = combineReducers({
  orders
});

export default mealApp;
