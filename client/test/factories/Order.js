import { Factory } from 'rosie';
import UserFactory from './User';
import LineItemFactory from './LineItem'

export default new Factory()
  .sequence('id', (i) => `${i}`)
  .attrs({
    attributes: {
      status: 'open',
      restaurant: 'Restaurant name',
      owner: UserFactory.build(),
      'line-items': [LineItemFactory.build()]
    }
  });
