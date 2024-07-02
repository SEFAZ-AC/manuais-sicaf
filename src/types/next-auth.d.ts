import "next-auth";

declare module "next-auth" {
  interface User {
    id: number;
    username: string;
    name: string;
    avatar: string;
  }

  interface Session {
    user: User;
  }
}
