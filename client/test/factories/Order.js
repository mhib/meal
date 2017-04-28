import { Factory } from 'rosie';
import UserFactory from './User';
import LineItemFactory from './LineItem'

export default new Factory()
  .sequence('id')
  .attrs({
    status: 'open',
    restaurant: 'Restaurant name',
    owner: UserFactory.build(),
    line_items: [LineItemFactory.build()]
  });
