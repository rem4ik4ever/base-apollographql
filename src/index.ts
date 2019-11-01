import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { RegisterResolver } from "./modules/user/Register";
import session from "express-session";
import connectRedis from "connect-redis";
import { redis } from "./redis";
import cors from "cors";
import { LoginResolver } from "./modules/user/Login";
import { MeResolver } from "./modules/user/Me";

// import mongoose from "mongoose";
// import resolvers from "./resolvers";
// import typeDefs from "./typedefs";

// import { config } from "dotenv";

const startServer = async () => {
  await createConnection();

  const app = express();

  const schema = await buildSchema({
    resolvers: [RegisterResolver, LoginResolver, MeResolver],
    authChecker: ({ context: { req } }) => {
      if (req.session.userId) {
        return true;
      }
      return false;
    }
  });

  // const schema = makeExecutableSchema({
  //   typeDefs: typeDefs,
  //   resolvers: resolvers
  // });

  const server = new ApolloServer({
    schema,
    context: ({ req }: any) => ({ req })
  });

  const RedisStore = connectRedis(session);

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000"
    })
  );

  app.use(
    session({
      store: new RedisStore({
        client: redis as any
      }),
      name: "qid",
      secret: "some-secret-from-env",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365
      }
    })
  );

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
