const prisma = require('./../../prisma/prismaClient');

export const criarUsuario = (data) => prisma.usuario.create({ data });

export const listarUsuarios = () => prisma.usuario.findMany();

export const buscarUsuarioPorId = (id: number) => prisma.usuario.findUnique({ where: { id } });

export const atualizarUsuario = (id: number, data) => prisma.usuario.update({ where: { id }, data });

export const deletarUsuario = (id: number) => prisma.usuario.update({ where: { id }, data: { status: false }});