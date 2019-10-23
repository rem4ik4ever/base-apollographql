import { gql } from "apollo-server-express";
import { UserDef } from "./schemas/User";

const queryRoot = `
  type Query {
    _empty: String
  }
  type Mutation {
    createUser(email: String!, password: String!): User!
  }
`;

const typeDefs = [queryRoot, UserDef];

export default typeDefs;
