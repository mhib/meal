import axios from 'axios';

const ORDERS_PATH = '/orders';
const LINE_ITEMS_PATH = '/line_items';

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
  axios.post(ORDERS_PATH, { order: { restaurant } })
);

export const createLineItem = ({ cost, name }, order_id) => (
  axios.post(LINE_ITEMS_PATH,
    { line_item: { cost, name, order_id } })
);

export const getArchivedOrdersPage = (page) => (
  axios.get(`/archived_orders/${page}`)
);

export const updateOrderStatus = (status, id) => (
  axios.patch(ORDERS_PATH, { order: { status, id } })
);

export const deleteLineItem = (line_item) => (
  axios.delete(LINE_ITEMS_PATH, { data: { line_item } })
);
