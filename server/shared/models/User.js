const dummyData = [
  {
    id: 123,
    name: 'Namey McNameface',
    age: 99,
    someBool: true,
  },
  {
    id: 124,
    name: 'Other Someone',
    age: 22,
    someBool: false,
  },
];

const User = {
  name: 'User',
  fields: {
    id: { type: 'ID!' },
    name: { type: 'String' },
    age: { type: 'Int' },
    someBool: { type: 'Boolean' },
  },
  queries: {
    // these are for both graphql and MST
    users: {
      parameters: [],
      returnsArray: true,
      function: args => {
        return dummyData;
      },
    },
    userById: {
      parameters: ['id'],
      returnsArray: false,
      function: args => {
        return dummyData.filter(i => i.id === Number(args.id))[0]; // needs error handling
      },
    },
  },
};

export default User;
