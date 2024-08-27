import { randomUUID } from "crypto";

/**
 * The role of a user of the blog, which can be either a reader or a writer.
 */
export enum Role {
  WRITTER = "WRITTER",
  READER = "READER",
}

/**
 * A user of the blog.
 */
export interface BlogUser {
  id: string;
  name: string;
  role: Role;
}

/**
 * A service that manages users of the blog.
 *
 * It has methods to create users, add users, and get users by their id.
 */
export class BlogUserService {
  /**
   * A private map of user-id to user.
   */
  private _users: Map<string, BlogUser> = new Map();

  /**
   * Creates a new user.
   *
   * Note that this method doesn't store the user within the service, it only
   * returns it.
   *
   * @param name The name of the user.
   * @param role The role of the user.
   * @returns The new user, with a new random id.
   */
  public createUser(name: string, role: Role = Role.READER): BlogUser {
    const user = {
      id: randomUUID(),
      name,
      role,
    };

    return user;
  }

  /**
   * Adds a new user to the service, storing it for future use.
   *
   * @param user The user.
   */
  public async addUser(user: BlogUser): Promise<void> {
    if (this._users.has(user.id)) {
      throw new Error("User already exists.");
    }

    this._users.set(user.id, user);
  }

  /**
   * Returns a user by its id.
   *
   * @param id The id of the user.
   * @throws If the user doesn't exist.
   * @returns The user.
   */
  public async getUser(id: string): Promise<BlogUser> {
    const user = this._users.get(id);

    if (user === undefined) {
      throw new Error("User not found.");
    }

    return user;
  }
}
