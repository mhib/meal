import { Factory } from 'rosie';

export default new Factory()
  .sequence('id')
  .sequence('name', (i) => `Marcin Henryk Bartkowiak ${i}`);
