import * as filmeService from '../services/FilmeService';
import { Request, Response } from 'express';

export const criarFilme = async (req: Request, res: Response) => {
  const filme = await filmeService.criarFilme(req.body);
  res.json(filme);
};

export const listarFilmes = async (req: Request, res: Response) => {
  const filmes = await filmeService.listarFilmes();
  res.json(filmes);
};

export const buscarFilmePorId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const filme = await filmeService.buscarFilmePorId(Number(id));
  res.json(filme);
};

export const atualizarFilme = async (req: Request, res: Response) => {
  const { id } = req.params;
  const filme = await filmeService.atualizarFilme(Number(id), req.body);
  res.json(filme);
};

export const deletarFilme = async (req: Request, res: Response) => {
  const { id } = req.params;
  const filme = await filmeService.deletarFilme(Number(id));
  res.json(filme);
};