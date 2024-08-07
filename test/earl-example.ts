// We just import earl, no need to import plugins. If has
// enough features to be useful withoyt them.
import { expect } from "earl";

import { BlogUserService, Role } from "../src/index.js";

describe("earl: BlogUserService", () => {
  describe("User creation", () => {
    it("should create a new user", () => {
      const userService = new BlogUserService();
      const user = userService.createUser("John Doe");

      expect(user).toEqual({
        id: expect.a(String),
        name: "John Doe",
        role: Role.READER,
      });
    });

    it("should create a new user with a specific role", () => {
      const userService = new BlogUserService();
      const user = userService.createUser("John Doe", Role.WRITTER);

      expect(user).toEqual({
        id: expect.a(String),
        name: "John Doe",
        role: Role.WRITTER,
      });
    });

    it("Should assign a random UUID to the user", () => {
      const userService = new BlogUserService();
      const user = userService.createUser("John Doe");

      expect(user.id).toHaveLength(36);
    });

    it("Fails at compile time if the check is incomplete (EXPECTED FAILURE)", () => {
      const userService = new BlogUserService();
      const user = userService.createUser("John Doe");

      // @ts-expect-error This comment asserts that the next line results in a compilation error, remove it to see the result.
      expect(user).toEqual({
        id: expect.a(String),
        name: "John Doe",
      });

      // NOTE: This still fails at runtime.
    });
  });

  describe("Adding a user", () => {
    it("Should add a user", async () => {
      const userService = new BlogUserService();
      const user = userService.createUser("John Doe");
      await userService.addUser(user.id, user);

      expect(await userService.getUser(user.id)).toEqual(user);
    });

    it("Should throw an error if the user already exists", async () => {
      const userService = new BlogUserService();
      const user = userService.createUser("John Doe");
      await userService.addUser(user.id, user);

      await expect(userService.addUser(user.id, user)).toBeRejectedWith(
        "User already exists."
      );
    });

    it("fails at compile time if we forget an await (EXPECTED FAILURE)", async () => {
      const userService = new BlogUserService();
      const user = userService.createUser("John Doe");
      await userService.addUser(user.id, user);

      const user2 = userService.getUser(user.id);
      // @ts-expect-error This comment asserts that the next line results in a compilation error, remove it to see the result.
      expect(user2).toEqual(user);

      // NOTE: This still fails at runtime.
    });

    it("Fails because the error message is not the same as the one we expect (EXPECTED FAILURE)", async () => {
      const userService = new BlogUserService();
      const user = userService.createUser("John Doe");
      await userService.addUser(user.id, user);

      await expect(userService.getUser(user.id)).toBeRejectedWith(
        "This is not the error that we throw."
      );
    });
  });
});
