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
    }, 
    generos: {
      include: {
        genero: true
      }
    }
  }
});

export const buscarFilmePorId = (id: number) =>
  prisma.filme.findUnique({
    where: { id },
    include: {
      avaliacoes: {
        include: {
          usuario: true
        }
      }
    }
  });

export const atualizarFilme = (
  id: number,
  data: {
    nome?: string;
    diretor?: string;
    anoLancamento?: Date;
    duracao?: number;
    produtora?: string;
    classificacao?: string;
    poster?: string;
    generos?: number[];
  }
) => {
  const { generos, ...resto } = data;
  return prisma.filme.update({
    where: { id },
    data: {
      ...resto,
      ...(Array.isArray(generos) && {
        generos: {
          set: generos.map(idGenero => ({
            idFilme_idGenero: {
              idFilme: id,
              idGenero
            }
          }))
        }
      })
    }
  });
};

export const deletarFilme = (id: number) => prisma.filme.delete({ where: { id } });