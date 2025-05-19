import * as usuarioService from '../services/usuarioService';

export const criarUsuario = async (req, res) => {
  const usuario = await usuarioService.criarUsuario(req.body);
  res.json(usuario);
};

export const listarUsuarios = async (req, res) => {
  const usuarios = await usuarioService.listarUsuarios();
  res.json(usuarios);
};

export const buscarUsuarioPorId = async (req, res) => {
  const { id } = req.params;
  const usuario = await usuarioService.buscarUsuarioPorId(Number(id));
  res.json(usuario);
};

export const atualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const usuario = await usuarioService.atualizarUsuario(Number(id), req.body);
  res.json(usuario);
};

export const deletarUsuario = async (req, res) => {
  const { id } = req.params;
  const usuario = await usuarioService.deletarUsuario(Number(id));
  res.json(usuario);
};