/**
 * This is an example test of our mock BlogUserService using the Chai assertion
 * library, and Mocha, a poppular Node.js test runner.
 *
 * This file is meant to be self-explanatory, so reading the chai documentation
 * to have a basic understanding of it shouldn't be necessary.
 *
 * Instead, reading this example should give a good enough idea of how to use
 * Chai, some of its features and shortcomings.
 *
 * If you still want to learn more about Chai, you can check out the
 * documentation here: https://www.chaijs.com/guide
 */

/**
 * Chai has three different ways to assert things: `assert`, `expect` and
 * `should`. They are different styles to do the same thing, so we'd only
 * use `expect` in this example.
 *
 * To use `expect`, you need to call it with the value you want to assert
 * something about. Calling `expect` returns an `Assertion` object wich keeps
 * track of the value you want to assert.
 *
 * `Assertion` objects have methods to check that their value meets certain
 * criteria. For example, `expect(1).to.equal(1)`, `expect(1).to.be.a("number")`
 * checks that the value is a number. If the value doesn't meet the asserted
 * criteria, these methods throw an error.
 *
 * `Assertion` objects have multiple methods to assert a diverse set of things,
 * you can find the full list in the documentation, but it shouldn't be
 * necessary. Working with your editor's autocomplete is normally good enough to
 * discover the methods you need.
 *
 * `Assertion` objects also have multiple methods that can be used to make your
 * assertions look more like natural language, which that are not required and
 * just return the same `Assertion` object. For example, `expect(1).equal(1)`,
 * `expect(1).to.equal(1)` and `expect(1).to.be.equal(1)` are all valid and
 * equivalent.
 */
import { expect } from "chai";

/**
 * Chai has a system of plugins that can be used to extend its functionality.
 *
 * As it doesn't have native support to assert things about promises (e.g. if
 * it rejected or not), we use the `chai-as-promised` plugin.
 *
 * There are other common libraries and plugins that are used with Chai, but
 * they are not needed for this excercise.
 */
import { use } from "chai";
import chaiAsPromised from "chai-as-promised";
use(chaiAsPromised);

/**
 * We import the things that we want to test from our code.
 */
import { Role, BlogUserService } from "../src/index.js";

/**
 * With Mocha, you can organize your tests using `describe`, which takes a title
 * for a section of your test suite, and a function that defines the tests.
 */
describe("chai: BlogUserService", () => {
  /**
   * `describe` calls can be nested, which creates subsections of your test
   * suite.
   */
  describe("User creation", () => {
    /**
     * To define a test in Mocha, you use the `it` function, which takes a
     * title for the test, and a function that defines the test.
     *
     * Any assertion that you want to make can should done in this function.
     *
     * A test is considered to have passed if it doesn't throw an error.
     */
    it("should create a new user", async () => {
      /**
       * Like any traditional unit test, we initialize the part of the system
       * that we want to test, take it to a known state, and then make one ore
       * more assertions to check that the system is in the expected state.
       */
      const userService = new BlogUserService();
      const user = userService.createUser("John Doe");

      expect(user.id).to.be.a("string");
      expect(user.name).to.equal("John Doe");
      expect(user.role).to.equal(Role.READER);
    });

    it("should create a new user with a specific role", async () => {
      const userService = new BlogUserService();
      const user = userService.createUser("John Doe", Role.WRITTER);

      expect(user.id).to.be.a("string");
      expect(user.name).to.equal("John Doe");
      expect(user.role).to.equal(Role.WRITTER);
    });

    it("Should assign a random UUID to the user", async () => {
      const userService = new BlogUserService();
      const user = userService.createUser("John Doe");

      expect(user.id).to.be.a("string");
      expect(user.id).to.have.length(36);
    });

    it("Has multiple ways to do the same thing, which are valid but verbose and confusing", async () => {
      const userService = new BlogUserService();
      const user = userService.createUser("John Doe");

      expect(user.name).to.be.equal("John Doe");
      expect(user.name).to.equal("John Doe");
      expect(user.name).equal("John Doe");
      expect(user.name).that.is.equal("John Doe");
    });

    it("passes, despite the test being incomplete (not every property is checked)", async () => {
      const userService = new BlogUserService();
      const user = userService.createUser("John Doe");

      expect(user.name).to.be.equal("John Doe");
    });
  });

  describe("Adding a user", () => {
    it("Should add a user", async () => {
      const userService = new BlogUserService();
      const user = userService.createUser("John Doe");
      await userService.addUser(user);

      expect(await userService.getUser(user.id)).to.deep.equal(user);
    });

    it("Should throw an error if the user already exists", async () => {
      const userService = new BlogUserService();
      const user = userService.createUser("John Doe");
      await userService.addUser(user);

      expect(userService.addUser(user)).to.be.rejectedWith(
        "User already exists."
      );
    });

    it("fails at runtime because we forgot an await, but it could be at compile time (EXPECTED FAILURE)", async () => {
      const userService = new BlogUserService();
      const user = userService.createUser("John Doe");
      await userService.addUser(user);

      const user2 = userService.getUser(user.id);
      expect(user2).to.deep.equal(user);
    });

    it("should have failed, but the api is error prone with respect to error messages", async () => {
      const userService = new BlogUserService();
      const user = userService.createUser("John Doe");
      await userService.addUser(user);

      expect(userService.getUser(user.id)).to.be.rejectedWith(
        "This is not the error that we throw, but the tests still passes."
      );

      expect(userService.getUser(user.id)).to.be.rejectedWith(
        new Error("Same here")
      );
    });
  });
});
