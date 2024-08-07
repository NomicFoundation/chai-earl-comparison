import { randomUUID } from "crypto";

/**
 * Returns a new user id.
 */
export function getNewUserId(): string {
  return randomUUID();
}

export enum Role {
  WRITTER = "WRITTER",
  READER = "READER",
}

export interface BlogUser {
  id: string;
  name: string;
  role: Role;
}

export class BlogUserService {
  private users: Map<string, BlogUser> = new Map();

  public createUser(name: string, role: Role = Role.READER): BlogUser {
    const user = {
      id: getNewUserId(),
      name,
      role,
    };

    return user;
  }

  public async addUser(id: string, user: BlogUser): Promise<void> {
    if (this.users.has(id)) {
      throw new Error("User already exists.");
    }

    this.users.set(id, user);
  }

  public async getUser(id: string): Promise<BlogUser> {
    const user = this.users.get(id);
    if (user === undefined) {
      throw new Error("User not found.");
    }

    return user;
  }
}
