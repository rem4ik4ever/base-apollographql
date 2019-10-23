import { UserResolver } from "./schemas/User";
import { merge } from "lodash";

const hello = {
  Query: {}
};

const resolvers = merge(hello, UserResolver);

export default resolvers;
