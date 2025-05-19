import * as generoService from '../services/GeneroService';
import { Request, Response } from 'express';

export const criarGenero = async (req: Request, res: Response) => {
  const genero = await generoService.criarGenero(req.body);
  res.json(genero);
};

export const listarGeneros = async (req: Request, res: Response) => {
  const generos = await generoService.listarGeneros();
  res.json(generos);
};

export const buscarGeneroPorId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const genero = await generoService.buscarGeneroPorId(Number(id));
  res.json(genero);
};

export const atualizarGenero = async (req: Request, res: Response) => {
  const { id } = req.params;
  const genero = await generoService.atualizarGenero(Number(id), req.body);
  res.json(genero);
};

export const deletarGenero = async (req: Request, res: Response) => {
  const { id } = req.params;
  const genero = await generoService.deletarGenero(Number(id));
  res.json(genero);
};