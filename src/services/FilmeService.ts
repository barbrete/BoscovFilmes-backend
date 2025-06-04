import prisma from '../../prisma/prismaClient';

export const criarFilme = async (data: {
  nome: string;
  diretor: string;
  anoLancamento: Date;
  duracao: Date;
  produtora: string;
  classificacao: string;
  poster: string;
  generos: number[];
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
      generos: {
        create: data.generos.map(idGenero => ({
          genero: { connect: { id: idGenero } }
        }))
      }
    }
  });
};

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

// export const listarFilmesRecentes = () =>
//   prisma.filme.findMany({
//     orderBy: { createdAt: 'desc' }, 
//     take: 10
//   });

