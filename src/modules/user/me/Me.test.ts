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

const MeQuery = `
  {
    me {
      id,
      firstName,
      lastName,
      email,
      name
    }
  }
`;

describe("Me", () => {
  it("should get user", async () => {
    const data = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };
    const user = await User.create(data).save();

    const response = await gCall({
      source: MeQuery,
      userId: user.id
    });

    expect(response).toMatchObject({
      data: {
        me: {
          id: `${user.id}`,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`
        }
      }
    });
  });

  it("should return null", async () => {
    const response = await gCall({
      source: MeQuery
    });

    expect(response).toMatchObject({
      data: {
        me: null
      }
    });
  });
});
