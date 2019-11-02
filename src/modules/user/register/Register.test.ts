import { testConn } from "../../../test-utils/testConn";
import { Connection } from "typeorm";
import { gCall } from "../../../test-utils/gCall";
import faker from "faker";
import { User } from "../../../entity/User";

let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
});

afterAll(async () => {
  await conn.close();
});

const registerMutation = `
  mutation Register($input: RegisterInput!) {
    register(input: $input){
      id, 
      firstName,
      lastName,
      name,
      email
    }
  }
`;

describe("Register", () => {
  it("should create user", async () => {
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };
    await gCall({
      source: registerMutation,
      variableValues: {
        input: user
      }
    });

    const dbUser = await User.findOne({ where: { email: user.email } });
    expect(dbUser).toBeDefined();
    expect(dbUser!.confirmed).toBeFalsy();
    expect(dbUser!.firstName).toBe(user.firstName);
  });
});
