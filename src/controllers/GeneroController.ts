import * as generoService from '../services/generoService';

export const criarGenero = async (req, res) => {
  const genero = await generoService.criarGenero(req.body);
  res.json(genero);
};

export const listarGeneros = async (req, res) => {
  const generos = await generoService.listarGeneros();
  res.json(generos);
};

export const buscarGeneroPorId = async (req, res) => {
  const { id } = req.params;
  const genero = await generoService.buscarGeneroPorId(Number(id));
  res.json(genero);
};

export const atualizarGenero = async (req, res) => {
  const { id } = req.params;
  const genero = await generoService.atualizarGenero(Number(id), req.body);
  res.json(genero);
};

export const deletarGenero = async (req, res) => {
  const { id } = req.params;
  const genero = await generoService.deletarGenero(Number(id));
  res.json(genero);
};