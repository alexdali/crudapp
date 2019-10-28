import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
// import schema, { graphql } from "./schema";
// import graphql from 'graphql';
// import { makeExecutableSchema } from 'graphql-tools';
import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import typeDefs from './graphql/typedef';
import resolvers from './graphql/resolvers';
import uri from './mongodb/db';

require('dotenv').config({ path: 'variables.env' });

mongoose.connect(uri, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
});


mongoose.connection.once('open', () => {
  console.log('connected to MongoDB');
}).catch((err) => console.error('error MongoDb', err));

// const corsOptions = {
//   origin: process.env.FRONTEND_URL,
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

const corsOptions = {
  origin: 'http://localhost:3333',
  credentials: true,
};

// create server
const app = express();
const port = 8000;

app.use(cors(corsOptions));

app.use(bodyParser.json());

const server = new ApolloServer({
  introspection: true,
  // schema,
  typeDefs,
  resolvers,
  formatError: (error) => error,
  context: ({ req, res }) => ({
    req,
    res,
    secret: process.env.SECRET,
  }),
});


// The GraphQL endpoint
server.applyMiddleware({
  app,
  path: '/',
  cors: false, // disables the apollo-server-express cors to allow the cors middleware use
});
// server.applyMiddleware({ app });

// GraphiQL, a visual editor for queries
// server.applyMiddleware({ app, path: '/graphql' });


// app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
// server.applyMiddleware({ app, path: '/' });

app.listen(port, () => {
  console.log(`app server listening on port: ${port}`);
});
