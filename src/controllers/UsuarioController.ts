import * as usuarioService from '../services/UsuarioService';
import { Request, Response } from 'express';

export const criarUsuario = async (req: Request, res: Response) => {
  const usuario = await usuarioService.criarUsuario(req.body);
  res.json(usuario);
};

export const listarUsuarios = async (req: Request, res: Response) => {
  const usuarios = await usuarioService.listarUsuarios();
  res.json(usuarios);
};

export const buscarUsuarioPorId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const usuario = await usuarioService.buscarUsuarioPorId(Number(id));
  res.json(usuario);
};

export const atualizarUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const usuario = await usuarioService.atualizarUsuario(Number(id), req.body);
  res.json(usuario);
};

export const deletarUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const usuario = await usuarioService.deletarUsuario(Number(id));
  res.json(usuario);
};