import { z } from 'zod';

export const generoFilmeSchema = z.object({
  idFilme: z.number({
    required_error: "ID do filme é obrigatório",
    invalid_type_error: "ID do filme deve ser um número",
  }),
  idGenero: z.number({
    required_error: "ID do gênero é obrigatório",
    invalid_type_error: "ID do gênero deve ser um número",
  }),
});