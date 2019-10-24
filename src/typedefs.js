import { gql } from "apollo-server-express";
import { UserDef } from "./schemas/User";

const queryRoot = `
  type Query {
    _empty: String
  }
  
`;

const typeDefs = [queryRoot, UserDef];

export default typeDefs;
