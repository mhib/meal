import ActionCable from 'actioncable';

const cable = ActionCable.createConsumer();

export const ORDERS_CHANNEL = 'OrdersChannel';

export const createSubscription = (channel, callback) =>
  cable.subscriptions.create(channel, { received: callback });

export const removeSubscription = (subscription) =>
  cable.subscriptions.remove(subscription);
