import { UsuarioUpdateInput } from './../../generated/prisma/index.d';
const prisma = require('./../../prisma/prismaClient');
import { Prisma } from '@prisma/client';

export const criarUsuario = (data: Prisma.UsuarioCreateInput) => prisma.usuario.create({ data });

export const listarUsuarios = () => prisma.usuario.findMany();

export const buscarUsuarioPorId = (id: number) => prisma.usuario.findUnique({ where: { id } });

export const atualizarUsuario = (id:number, Prisma.UsuarioUpdateInput) => prisma.usuario.update({ where: { id }, data });

export const deletarUsuario = (id: number) => prisma.usuario.update({ where: { id }, data: { status: false }});