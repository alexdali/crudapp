import express from 'express';
import mongoose from 'mongoose';
// import schema, { graphql } from "./schema";
// import graphql from 'graphql';
// import { makeExecutableSchema } from 'graphql-tools';
import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import typeDefs from './graphql/typedef';
import resolvers from './graphql/resolvers';
import uri from './mongodb/db';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', () => {
  console.log('connected to MongoDB');
}).catch((err) => console.error('error MongoDb', err));


// create server
const app = express();
const port = 8000;

app.use(bodyParser.json());

const server = new ApolloServer({
  introspection: true,
  // schema,
  typeDefs,
  resolvers,
  formatError: (error) => error,
  context: ({ req, res }) => ({
    req, res,
  }),
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen(port, () => {
  console.log(`app server listening on port: ${port}`);
});
