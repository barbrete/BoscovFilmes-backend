const prisma = require('./../../prisma/prismaClient');

export const criarFilme = (data: {
  nome: string;
  diretor: string;
  anoLancamento: Date;
  duracao: Date;
  produtora: string;
  classificacao: string;
  poster: string;
}) => prisma.filme.create({ data });

export const listarFilmes = () => prisma.filme.findMany();

export const buscarFilmePorId = (id: number) => prisma.filme.findUnique({ where: { id } });

export const atualizarFilme = (id: number, data: { 
  nome?: string;
  diretor?: string;
  anoLancamento?: Date;
  duracao?: Date;
  produtora?: string;
  classificacao?: string;
  poster?: string;
}) => prisma.filme.update({ where: { id }, data });

export const deletarFilme = (id: number) => prisma.filme.delete({ where: { id } });