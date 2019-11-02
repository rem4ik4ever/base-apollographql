import { testConn } from "../../../test-utils/testConn";
import { Connection } from "typeorm";
import { gCall } from "../../../test-utils/gCall";

let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
});

afterAll(async () => {
  await conn.close();
});

const registerMutation = `
  mutation Register($data: RegisterInput) {
    register($input: $input!){
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
    console.log(
      await gCall({
        source: registerMutation,
        variableValues: {
          data: {
            firstName: "Igor",
            lastName: "Kim",
            email: "igor@kim.com",
            password: "qwerty"
          }
        }
      })
    );
  });
});
