import { z } from 'zod';

export const usuarioSchema = z.object({
  nome: z.string().nonempty("Nome é obrigatório"),
  data_nascimento: z.preprocess(
    (arg) => {
      if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
    },
    z.date({ invalid_type_error: "Data de nascimento deve ser uma data válida" })
  ),
  email: z.string().email("Email inválido"),
  apelido: z.string().nonempty("Apelido é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  status: z.boolean(),
});