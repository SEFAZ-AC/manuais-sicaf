import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().length(11, { message: "O CPF deve possuir 11 dígitos" }),
  password: z
    .string()
    .max(22, { message: "A senha deve possuir no máximo 22 caracteres" })
    .min(6, { message: "A senha deve possuir no mínimo 6 caracteres" }),
});

export const updateUserSchema = z
  .object({
    name: z.string().nonempty({ message: "O nome é obrigatório" }),
    avatar: z.string().optional(),
    oldPassword: z
      .string()
      .min(6, { message: "A senha deve possuir entre 6 e 22 caracteres" })
      .max(22)
      .optional()
      .or(z.literal("")),
    newPassword: z
      .string()
      .min(6, { message: "A nova senha deve possuir entre 6 e 22 caracteres" })
      .max(22)
      .optional()
      .or(z.literal("")),
    confirmNewPassword: z
      .string()
      .min(6, {
        message: "A confirmação de senha deve possuir entre 6 e 22 caracteres",
      })
      .max(22)
      .optional()
      .or(z.literal("")),
  })
  .refine(
    (data) => {
      const passwordsFilled = [
        data.oldPassword,
        data.newPassword,
        data.confirmNewPassword,
      ].filter(Boolean).length;
      if (passwordsFilled > 0 && passwordsFilled < 3) {
        return false;
      }
      return data.newPassword === data.confirmNewPassword;
    },
    {
      message:
        "Para alterar a senha, todos os campos de senha são necessários e a nova senha deve coincidir com a confirmação.",
      path: ["confirmNewPassword"],
    }
  );

export type LoginSchema = z.infer<typeof loginSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
