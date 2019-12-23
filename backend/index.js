import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
// import schema, { graphql } from "./schema";
// import graphql from 'graphql';
// import { makeExecutableSchema } from 'graphql-tools';
import { ApolloServer } from 'apollo-server-express';
// import bodyParser from 'body-parser';
import typeDefs from './graphql/typedef';
import resolvers from './graphql/resolvers';
// import uri from './mongodb/db';
import connectDBwithRetry from './mongodb/connectionDB';
import { getUser } from './mongodb/controllersGet';

require('dotenv').config({ path: 'variables.env' });

// connect to DB
connectDBwithRetry();

// create server
const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  // origin: 'http://localhost:3333',
  origin: process.env.FRONTEND_URL,
  credentials: true,
};

// cors
app.use(cors(corsOptions));
app.use(cookieParser());

// get User Id by token
const getMe = async (req) => {
  const { token } = req.cookies;
  if (!token) return null;

  const userId = jwt.verify(token, process.env.SECRET, (err, decoded) => decoded.id);
  const user = await getUser(userId);
  return user;
};

// up server. Add user in req
const server = new ApolloServer({
  introspection: true,
  // schema,
  typeDefs,
  resolvers,
  formatError: (error) => error,
  context: async ({ req, res }) => {
    const user = await getMe(req);
    req.user = user;
    return {
      ...req,
      res,
      secret: process.env.SECRET,
    };
  }
  ,
},
() => {
  console.log(`app.use2 server.context.req: ${JSON.stringify(server.context.req)}`);
});

// app route
server.applyMiddleware({
  app,
  path: '/',
  cors: false, // disables the apollo-server-express cors to allow the cors middleware use
},
() => {
  app.use((req, res, next) => {
    next();
  });
});


app.listen(port, () => {
  console.log(`app server listening on port: ${port}`);
});
