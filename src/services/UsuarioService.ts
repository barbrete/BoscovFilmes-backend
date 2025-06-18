import prisma from '../../prisma/prismaClient';

export const criarUsuario = async (data: {
    email: string;
    apelido: string;
    password: string;
    status: boolean;
    nome: string;
    data_nascimento: Date;
    tipo_usuario: string;
}) => {
    return prisma.usuario.create({
        data: {
            nome: data.nome,
            email: data.email,
            apelido: data.apelido,
            data_nascimento: data.data_nascimento,
            password: data.password,
            status: data.status,
            tipo_usuario: data.tipo_usuario,
        },
    });
};

export const listarUsuarios = () => prisma.usuario.findMany();

export const buscarUsuarioPorId = (id: number) =>
  prisma.usuario.findUnique({
    where: { id },
    include: {
      avaliacao: {
        include: {
          filme: true 
        }
      }
    }
  });
  
export const atualizarUsuario = (id: number, data: any) => prisma.usuario.update({ where: { id }, data });
export const deletarUsuario = (id: number) => prisma.usuario.update({ where: { id }, data: { status: false } });