import ApolloClient, { createBatchingNetworkInterface } from 'apollo-client';

const client = new ApolloClient({
  networkInterface: createBatchingNetworkInterface({
    uri: 'http://localhost:8080/graphql', // TODO: make this more useful
    batchInterval: 10, // in milliseconds
    batchMax: 10,
  }),
});

export default client;
