import { Request, Response } from 'express';
import { generoSchema } from '../shemas/GeneroSchema';
import * as generoService from '../services/GeneroService';

export const criarGenero = async (req: Request, res: Response): Promise<void> => {
  const parseResult = generoSchema.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({ errors: parseResult.error.errors });
    return;
  }
  try {
    const genero = await generoService.criarGenero(parseResult.data);
    res.status(201).json(genero);
    return;
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar gênero", details: err });
    return;
  }
};

export const listarGeneros = async (req: Request, res: Response) => {
  try {
    const generos = await generoService.listarGeneros();
    res.json(generos);
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar gêneros", details: err });
  }
};

export const buscarGeneroPorId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const genero = await generoService.buscarGeneroPorId(Number(id));
    res.json(genero);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar gênero", details: err });
  }
};

export const atualizarGenero = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const genero = await generoService.atualizarGenero(Number(id), req.body);
    res.json(genero);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar gênero", details: err });
  }
};

export const deletarGenero = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const genero = await generoService.deletarGenero(Number(id));
    res.json(genero);
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar gênero", details: err });
  }
};