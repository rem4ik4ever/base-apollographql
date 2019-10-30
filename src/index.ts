import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import { buildSchema, Resolver, Query } from "type-graphql";
import "reflect-metadata";
import { createConnection } from "typeorm";

// import mongoose from "mongoose";
// import resolvers from "./resolvers";
// import typeDefs from "./typedefs";

// import { config } from "dotenv";

@Resolver()
class HelloResolver {
  @Query(() => String)
  async hello() {
    return await "Hello Rem!";
  }
}

const startServer = async () => {
  await createConnection();

  const app = express();

  const schema = await buildSchema({
    resolvers: [HelloResolver]
  });

  // const schema = makeExecutableSchema({
  //   typeDefs: typeDefs,
  //   resolvers: resolvers
  // });

  const server = new ApolloServer({ schema });

  server.applyMiddleware({ app });

  // await mongoose.connect("mongodb://mongo:27017/test", {
  //   useNewUrlParser: true
  // });
  // config();
  // console.log("ENV", process.env.APP_SECRET);

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
