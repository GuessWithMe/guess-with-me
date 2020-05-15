import { Room } from '../src/models';

const Rooms = async () => {
  await Room.bulkCreate([
    {
      title: 'GuessWith.me Selection',
      slug: 'selection',
      isPersistent: true
    },
    {
      title: 'GuessWith.me Selection 2',
      slug: 'selection-2',
      isPersistent: true
    }
  ]);
};

export default Rooms;
