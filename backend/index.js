import express from 'express';
// import schema, { graphql } from "./schema";
// import graphql from 'graphql';
import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import typeDefs from './graphql/typedef';
import resolvers from './graphql/resolvers';

// Import GraphQL Schema
// const schema = require('./schema')


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://dbprog:<password>@cluster0-yywck.mongodb.net/test?retryWrites=true&w=majority";
// password: ${env:PASSWORD}
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

// create server
const app = express();
const port = 8000;

// add default route "/"
// app.get("/", (req,res)=> {
//   let query = `{
//     person { name },
//     people { name, description, }
//   }`;
//   graphql(schema, query).then(result => {
//     res.json(result);
//   });
// });

app.use(bodyParser.json());

const server = new ApolloServer({
  introspection: true,
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
