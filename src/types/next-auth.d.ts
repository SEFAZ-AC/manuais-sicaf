import "next-auth";

declare module "next-auth" {
  interface User {
    id: number;
    username: string;
    name: string;
    avatar: string;
    admin: boolean;
  }

  interface Session {
    user: User;
  }
}
