import { z } from 'zod';

// Se os dados de data vierem como string do front, vamos usar preprocess para convertê-los em Date.
export const filmeSchema = z.object({
  nome: z.string().nonempty("Nome é obrigatório"),
  diretor: z.string().nonempty("Diretor é obrigatório"),
  anoLancamento: z.preprocess(
    (arg) => {
      if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
    },
    z.date({ invalid_type_error: "Data inválida para ano de lançamento" })
  ),
  duracao: z.preprocess(
    (arg) => {
      if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
    },
    z.date({ invalid_type_error: "Data inválida para duração" })
  ),
  produtora: z.string().nonempty("Produtora é obrigatória"),
  classificacao: z.string().nonempty("Classificação é obrigatória"),
  poster: z.string().url("Poster deve ser uma URL válida"),
  generosId: z.array(z.number()).optional(),
});