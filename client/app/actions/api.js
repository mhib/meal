import axios from 'axios';

const ORDERS_PATH = '/orders.json';
const LINE_ITEMS_PATH = '/line_items.json';

const getCSRFToken = (config) => {
  const token = document.querySelector('meta[name="csrf-token"]').content;
  if (config.headers) {
    config.headers['X-CSRF-Token'] = token;
  } else {
    config.headers = { 'X-CSRF-Token': token };
  }
  return config;
};

axios.interceptors.request.use(getCSRFToken, (error) => Promise.reject(error));

export const createOrder = function(restaurant) {
  return axios.post(ORDERS_PATH, {order: { restaurant: restaurant } });
}

export const createLineItem = function({ cost, name }, orderId) {
  return axios.post(LINE_ITEMS_PATH, {line_item: { cost: cost * 100, name: name, order_id: orderId }});
}

export const getArchivedOrdersPage = function(page) {
  return axios.get(`/archived_orders/${page}.json`)
}
