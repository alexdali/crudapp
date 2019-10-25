import express from 'express';
import mongoose from 'mongoose';
// import schema, { graphql } from "./schema";
// import graphql from 'graphql';
// import { makeExecutableSchema } from 'graphql-tools';
import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import typeDefs from './graphql/typedef';
import resolvers from './graphql/resolvers';
// import uri from './mongodb/db';
require('dotenv').config({ path: 'variables.env' });

// Import GraphQL Schema
// const schema = require('./schema')

// make graphql schema
// const schema = makeExecutableSchema({
//   typeDefs,
//   resolvers,
// });


// const {MongoClient} = require('mongodb');

// const uri = 'mongodb+srv://dbprog:<password>@cluster0-yywck.mongodb.net/test?retryWrites=true&w=majority';
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect((err) => {
//   const collection = client.db('test').collection('devices');
//   // perform actions on the collection object
//   client.close();
// });


const password = process.env.DBUSER_PASS;

const mongoDBuri = process.env.MONGODB_URL;

// mongoose.connect(`mongodb+srv://dbprog:${password}@cluster0-yywck.mongodb.net/test?retryWrites=true&w=majority`);
// mongoose.connect('mongodb://<dbuser>:<dbpassword>@<MongoDB URI>');

// mongoose.connect(`mongodb+srv://dbprog:${password}@${mongoDBuri}`, { useNewUrlParser: true });

const uri = `mongodb+srv://dbprog:${password}@${mongoDBuri}`;


mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', () => {
  console.log('connected to MongoDB');
}).catch((err) => console.error('error MongoDb', err));


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
