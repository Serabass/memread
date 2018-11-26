// https://stackoverflow.com/questions/28795242/injecting-only-function-and-running-it-through-createremotethread-c

import { ApolloServer } from 'apollo-server';
import { schemaComposer } from 'graphql-compose';

import './schema';
import './types';

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({
    schema: schemaComposer.buildSchema(),
    context: (context) => context,
});

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
