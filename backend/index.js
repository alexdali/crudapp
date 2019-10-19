import express from "express";
//import schema, { graphql } from "./schema";
//import graphql from 'graphql';
import { ApolloServer } from "apollo-server-express";
import bodyParser from "body-parser";
import typeDefs from './typedef';
import resolvers from './resolvers';

// Import GraphQL Schema
//const schema = require('./schema')

//create server
const app = express();
const port = 8000;

//add default route "/"
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
  formatError: error => {
    return error
  },
  context: ({req,res})=> {
    return {
      req,res
    }
  }
});

server.applyMiddleware({app, path: '/graphql'});

app.listen(port, ()=>{
  console.log(`app server listening on port: ${port}`);
});