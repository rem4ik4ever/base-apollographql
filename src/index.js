import { ApolloServer, gql, makeExecutableSchema } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import resolvers from "./resolvers";
import typeDefs from "./typedefs";

const startServer = async () => {
  const app = express();

  const schema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
  });

  const server = new ApolloServer({ schema });

  server.applyMiddleware({ app });

  await mongoose.connect("mongodb://mongo:27017/test", {
    useNewUrlParser: true
  });

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();