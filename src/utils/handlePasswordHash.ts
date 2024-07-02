import { hash, verify } from "argon2";

export async function hashPassword(password: string) {
  const hashedPassword = await hash(password);
  return hashedPassword;
}

export async function isPasswordValid(
  password: string,
  hashedPassword: string
) {
  const isValid = await verify(hashedPassword, password);
  return isValid;
}
