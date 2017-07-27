import merge from 'lodash/merge';
import { makeExecutableSchema } from 'graphql-tools';

const transformModel = schema => {
  // generate a typedef and queries for the schema
  const properties = Object.keys(schema.fields)
    .map(key => `${key}: ${schema.fields[key].type}`)
    .reduce((result, item) => result + '\n' + item, '');
  const types = `
    type ${schema.name} {
      ${properties}
    }
  `;

  const transformedQueries = Object.keys(schema.queries).map(key => {
    const parameters = schema.queries[key].parameters.map(parameter => {
      const { type } = schema.fields[parameter];
      return `${parameter}: ${type}`;
    });
    const parametersAsString = parameters.reduce(
      (result, item) => result = ', ' + item,
      ''
    );
    const queryDefinition = parameters.length
      ? `${key} (${parametersAsString}):`
      : `${key}:`;
    const queryReturns = schema.queries[key].returnsArray
      ? `[${schema.name}]`
      : `${schema.name}`;
    return {
      name: key,
      resolver: (root, args) => schema.queries[key].function({ root, ...args }),
      query: queryDefinition + ' ' + queryReturns,
    };
  });

  // generates a query to fetch all and one to fetch by id

  const queries = transformedQueries.reduce(
    (result, item) => result + '\n' + item.query,
    ''
  );

  const resolvers = {
    Query: transformedQueries.reduce(
      (result, item) => {
        return {
          [item.name]: item.resolver,
          ...result,
        };
      },
      {}
    ),
  };

  return { types, queries, resolvers };
};

// Smashes all of the objects together
const buildSchemaObject = models => {
  const typeDefs = [];
  const queries = [];
  let resolvers = {
    Query: {},
  };
  models.forEach(model => {
    if (model.types) {
      typeDefs.push(model.types);
    }
    if (model.queries) {
      queries.push(model.queries);
    }
    if (model.resolvers) {
      resolvers = merge({}, resolvers, model.resolvers);
    }
  });

  const typeDefsString = typeDefs.reduce(
    (result, item) => result + '\n' + item,
    ''
  );
  const queriesString = queries.reduce(
    (result, item) => result + '\n' + item,
    ''
  );

  const schema = `
    ${typeDefsString}

    type Query {
      ${queriesString}
    }

    schema {
    	query: Query
    }
  `;

  return { typeDefs: schema, resolvers };
};

// Generates a final schema to be accepted by Apollo
const generateSchema = models => {
  const transformedModels = models.map(model => transformModel(model));
  const schemaObj = buildSchemaObject(transformedModels);
  return makeExecutableSchema(schemaObj);
};

export default generateSchema;
