import { Request, Response } from 'express';
import { usuarioSchema } from '../shemas/UsuarioSchema';
import * as usuarioService from '../services/UsuarioService';

export const criarUsuario = async (req: Request, res: Response): Promise<void> => {
  const parseResult = usuarioSchema.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({ errors: parseResult.error.errors });
    return;
  }
  try {
    const usuario = await usuarioService.criarUsuario(parseResult.data);
    res.status(201).json(usuario);
    return;
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar usuário", details: err });
    return;
  }
};

export const listarUsuarios = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuarios = await usuarioService.listarUsuarios();
    res.json(usuarios);
    return;
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar usuários", details: err });
    return;
  }
};

export const buscarUsuarioPorId = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const usuario = await usuarioService.buscarUsuarioPorId(Number(id));
    res.json(usuario);
    return;
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar usuário", details: err });
    return;
  }
};

export const atualizarUsuario = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  // Para atualização, usamos o schema parcial para permitir envio de campos opcionais
  const parseResult = usuarioSchema.partial().safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({ errors: parseResult.error.errors });
    return;
  }
  try {
    const usuario = await usuarioService.atualizarUsuario(Number(id), parseResult.data);
    res.json(usuario);
    return;
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar usuário", details: err });
    return;
  }
};

export const deletarUsuario = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const usuario = await usuarioService.deletarUsuario(Number(id));
    res.json(usuario);
    return;
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar usuário", details: err });
    return;
  }
};