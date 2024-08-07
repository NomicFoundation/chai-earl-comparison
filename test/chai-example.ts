import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";

import { BlogUser, Role, BlogUserService } from "../src/index.js";

// NOTE: We use the chai-as-promised plugin to be able to assert that a promise
// is rejected.
//
// Other common libraries that are used with chai, but not needed/less important
// with Earl are Sinon (for mocking) and snapshot testing libraries (there's no
// clear winner in this category).
use(chaiAsPromised);

describe("chai: BlogUserService", () => {
  describe("User creation", () => {
    it("should create a new user", () => {
      const userService = new BlogUserService();
      const user = userService.createUser("John Doe");

      expect(user.id).to.be.a("string");
      expect(user.name).to.equal("John Doe");
      expect(user.role).to.equal(Role.READER);
    });

    it("should create a new user with a specific role", () => {
      const userService = new BlogUserService();
      const user = userService.createUser("John Doe", Role.WRITTER);

      expect(user.id).to.be.a("string");
      expect(user.name).to.equal("John Doe");
      expect(user.role).to.equal(Role.WRITTER);
    });

    it("Should assign a random UUID to the user", () => {
      const userService = new BlogUserService();
      const user = userService.createUser("John Doe");

      expect(user.id).to.be.a("string");
      expect(user.id).to.have.length(36);
    });

    it("Has multiple ways to do the same thing, which are valid but verbose and confusing", () => {
      const userService = new BlogUserService();
      const user = userService.createUser("John Doe");

      expect(user.name).to.be.equal("John Doe");
      expect(user.name).to.equal("John Doe");
      expect(user.name).equal("John Doe");
      expect(user.name).that.is.equal("John Doe");
    });

    it("passes, despite the test being incomplete (not every property is checked)", () => {
      const userService = new BlogUserService();
      const user = userService.createUser("John Doe");

      expect(user.name).to.be.equal("John Doe");
    });
  });

  describe("Adding a user", () => {
    it("Should add a user", async () => {
      const userService = new BlogUserService();
      const user = userService.createUser("John Doe");
      await userService.addUser(user.id, user);

      expect(await userService.getUser(user.id)).to.deep.equal(user);
    });

    it("Should throw an error if the user already exists", async () => {
      const userService = new BlogUserService();
      const user = userService.createUser("John Doe");
      await userService.addUser(user.id, user);

      expect(userService.addUser(user.id, user)).to.be.rejectedWith(
        "User already exists."
      );
    });

    it("fails at runtime because we forgot an await, but it could be at compile time (EXPECTED FAILURE)", async () => {
      const userService = new BlogUserService();
      const user = userService.createUser("John Doe");
      await userService.addUser(user.id, user);

      const user2 = userService.getUser(user.id);
      expect(user2).to.deep.equal(user);
    });

    it("should have failed, but the api is error prone with respect to error messages", async () => {
      const userService = new BlogUserService();
      const user = userService.createUser("John Doe");
      await userService.addUser(user.id, user);

      expect(userService.getUser(user.id)).to.be.rejectedWith(
        "This is not the error that we throw, but the tests still passes."
      );

      expect(userService.getUser(user.id)).to.be.rejectedWith(
        new Error("Same here")
      );
    });
  });
});
