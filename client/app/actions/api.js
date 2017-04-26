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

export const createOrder = (restaurant) => (
  axios.post(ORDERS_PATH, { order: { restaurant: restaurant } })
);

export const createLineItem = ({ cost, name }, orderId) => (
  axios.post(LINE_ITEMS_PATH,
    { line_item: { cost: cost * 100, name, order_id: orderId } })
);

export const getArchivedOrdersPage = (page) => (
  axios.get(`/archived_orders/${page}.json`)
);
