import { z } from 'zod';

export const avaliacaoSchema = z.object({
  idUsuario: z.number({
    required_error: "ID do usuário é obrigatório",
    invalid_type_error: "ID do usuário deve ser um número",
  }),
  idFilme: z.number({
    required_error: "ID do filme é obrigatório",
    invalid_type_error: "ID do filme deve ser um número",
  }),
  nota: z.number({
    required_error: "Nota é obrigatória",
    invalid_type_error: "Nota deve ser um número",
  }).min(0, "A nota mínima é 0").max(5, "A nota máxima é 5"),
  comentario: z.string().optional(),
});