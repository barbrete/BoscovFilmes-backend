import prisma from '../../prisma/prismaClient';

export const criarFilme = (data: {
  nome: string;
  diretor: string;
  anoLancamento: Date;
  duracao: number; 
  produtora: string;
  classificacao: string;
  poster: string;
  generosId?: number[];
}) => {
  return prisma.filme.create({
    data: {
      nome: data.nome,
      diretor: data.diretor,
      anoLancamento: data.anoLancamento,
      duracao: data.duracao,
      produtora: data.produtora,
      classificacao: data.classificacao,
      poster: data.poster,
      generos: data.generosId
        ? {
            create: data.generosId.map((id) => ({
              genero: { connect: { id } },
            })),
          }
        : undefined,
    },
  });
};

export const listarFilmes = () => prisma.filme.findMany({
  include: {
    avaliacoes: {
      include: {
        usuario: true
      }
    }
  }
});

export const buscarFilmePorId = (id: number) => prisma.filme.findUnique({ where: { id } });

export const atualizarFilme = (id: number, data: { 
  nome?: string;
  diretor?: string;
  anoLancamento?: Date;
  duracao?: number;
  produtora?: string;
  classificacao?: string;
  poster?: string;
}) => prisma.filme.update({ where: { id }, data });

export const deletarFilme = (id: number) => prisma.filme.delete({ where: { id } });