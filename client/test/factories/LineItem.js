import { Factory } from 'rosie';
import UserFactory from './User';

export default new Factory()
  .sequence('id')
  .sequence('name', (i) => `Meal ${i}`)
  .attrs({
    cost: () => +(1 + (Math.random() * 100).toFixed(2)),
    order_id: 1,
    user: UserFactory.build()
  });
