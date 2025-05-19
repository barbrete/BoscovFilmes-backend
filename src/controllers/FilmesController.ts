import * as filmeService from '../services/FilmeService';

export const criarFilme = async (req, res) => {
  const filme = await filmeService.criarFilme(req.body);
  res.json(filme);
};

export const listarFilmes = async (req, res) => {
  const filmes = await filmeService.listarFilmes();
  res.json(filmes);
};

export const buscarFilmePorId = async (req, res) => {
  const { id } = req.params;
  const filme = await filmeService.buscarFilmePorId(Number(id));
  res.json(filme);
};

export const atualizarFilme = async (req, res) => {
  const { id } = req.params;
  const filme = await filmeService.atualizarFilme(Number(id), req.body);
  res.json(filme);
};

export const deletarFilme = async (req, res) => {
  const { id } = req.params;
  const filme = await filmeService.deletarFilme(Number(id));
  res.json(filme);
};