import prisma from '../../prisma/prismaClient';

export const criarGenero = (data: { descricao: string }) =>  prisma.genero.create({ data });

export const listarGeneros = () => prisma.genero.findMany();

export const buscarGeneroPorId = (id: number) =>   prisma.genero.findUnique({ where: { id } });

export const atualizarGenero = (id: number, data: { descricao: string }) =>   prisma.genero.update({ where: { id }, data });

export const deletarGenero = (id: number) =>   prisma.genero.delete({ where: { id } });