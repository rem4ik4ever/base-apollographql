import { Resolver, Query, Arg, Mutation, UseMiddleware } from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";
import { isAuth } from "../middleware/isAuth";
import { sendEmail } from "../utils/sendEmail";
import { createConfirmationUrl } from "../utils/createConfirmationUrl";

@Resolver()
export class RegisterResolver {
  @UseMiddleware(isAuth)
  @Query(() => String)
  async hello() {
    return await "Hello Rem!";
  }

  @Query(() => [User!]!)
  async users() {
    return User.find();
  }

  @Mutation(() => User)
  async register(@Arg("input")
  {
    email,
    firstName,
    lastName,
    password
  }: RegisterInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    }).save();
    const url = await createConfirmationUrl(user.id);

    await sendEmail(email, url);
    return user;
  }
}
