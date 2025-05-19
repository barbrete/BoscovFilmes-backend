const prisma = require('./../../prisma/prismaClient');

export const criarAvaliacao = (data: {
  idUsuario: number;
  idFilme: number;
  nota: number;
  comentario?: string;
}) => prisma.avaliacao.create({ data });

export const listarAvaliacoes = () =>  prisma.avaliacao.findMany();

export const buscarAvaliacao = (idUsuario: number, idFilme: number) =>
  prisma.avaliacao.findUnique({
    where: {
      idUsuario_idFilme: { idUsuario, idFilme }
    }
  });

export const atualizarAvaliacao = (
  idUsuario: number,
  idFilme: number,
  data: { nota?: number; comentario?: string }
) => prisma.avaliacao.update({
  where: { idUsuario_idFilme: { idUsuario, idFilme } },
  data
});

export const deletarAvaliacao = (idUsuario: number, idFilme: number) =>  prisma.avaliacao.delete({ where: { idUsuario_idFilme: { idUsuario, idFilme } } });