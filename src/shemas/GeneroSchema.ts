import { z } from 'zod';

export const generoSchema = z.object({
  descricao: z.string().nonempty("Descricao do gênero é obrigatório"),
});