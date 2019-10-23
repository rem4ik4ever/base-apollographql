import { gql } from "apollo-server-express";
import User from "../models/User";

export const UserDef = `
  extend type Query {
    users: [User!]!
  }

  type User {
    id: ID!
    email: String!
    password: String!
  }
  
`;

export const UserResolver = {
  Query: {
    users: () => User.find()
  },

  Mutation: {
    createUser: async (_, { email, password }) => {
      const user = new User({ email, password });
      await user.save();
      console.log("User", user);
      return user;
    }
  }
};
