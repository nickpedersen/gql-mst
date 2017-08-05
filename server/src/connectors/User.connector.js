const dummyData = [
  {
    id: 123,
    name: 'Namey McNameface',
    age: 99,
  },
  {
    id: 124,
    name: 'Other Someone',
    age: 22,
  },
];

const User = {
  fetchAll: () => dummyData,
  fetchById: id => dummyData.filter(i => i.id === Number(id))[0],
};

export default User;
