//const graphql = require('graphql');
//const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList  } = graphql;
//import people from "./data/people";

//add types in datamodel
let humanType = new GraphQLObjectType({
  name: "Human",
  fields: ()=> ({
    id: {type: GraphQLString},
    description: { type: GraphQLString},
    name: { type: GraphQLString},
  })
});

let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      person: {
        type: humanType,
      resolve() {
        return people[0];
      }
    },
    people: {
      type: new GraphQLList(humanType),
    resolve() {
      return people;
    }
  }
  }
  })
});

module.exports = { graphql };
//export default schema;
module.exports = schema