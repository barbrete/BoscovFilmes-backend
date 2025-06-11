import * as filmeService from '../services/FilmeService';
import { Request, Response } from 'express';
import { filmeSchema } from '../shemas/FilmeSchema';

export const criarFilme = async (req: Request, res: Response): Promise<void> => {
  try {
    const filme = await filmeService.criarFilme(req.body);
    res.status(201).json(filme);
    return;
  } catch (err) {
    console.log('Erro ao criar filme:', err);
    res.status(500).json({ error: "Erro ao criar filme", detalhes: err });
    return;
  }
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