const prisma = require('./../../prisma/prismaClient');

export const criarGeneroFilme = (data: { idFilme: number; idGenero: number }) =>  prisma.generoFilme.create({ data });

export const listarGenerosFilme = () =>  prisma.generoFilme.findMany();

export const buscarGeneroFilme = (idFilme: number, idGenero: number) =>  prisma.generoFilme.findUnique({ where: {idFilme_idGenero: { idFilme, idGenero }}});

export const atualizarGeneroFilme = (
  idFilme: number,
  idGenero: number,
  data: { idFilme?: number; idGenero?: number }
) =>
  prisma.generoFilme.update({
    where: { idFilme_idGenero: { idFilme, idGenero } },
    data
  });

export const deletarGeneroFilme = (idFilme: number, idGenero: number) =>  prisma.generoFilme.delete({ where: { idFilme_idGenero: { idFilme, idGenero }}});