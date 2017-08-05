const dummyData = [
  {
    id: 1,
    title: 'Learn MobX State Tree',
    complete: false,
    user: 123,
  },
  {
    id: 2,
    title: 'Learn GraphQL',
    complete: true,
    user: 123,
  },
];

const Task = {
  fetchAll: () => dummyData,
  fetchById: id => dummyData.filter(i => i.id === Number(id))[0],
  fetchByUser: userId => dummyData.filter(i => i.user === Number(userId)),
};

export default Task;
