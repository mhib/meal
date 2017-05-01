import { Factory } from 'rosie';
import UserFactory from './User';
import LineItemFactory from './LineItem';

export default new Factory()
  .sequence('id')
  .sequence('restaurant', (e) => `Restaurant #${e}`)
  .attrs({
    status: 'open',
    owner: UserFactory.build(),
    line_items: [LineItemFactory.build()]
  });
