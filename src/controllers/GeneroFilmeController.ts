import { Request, Response } from 'express';
import { generoFilmeSchema } from '../shemas/GeneroFilmeSchema';
import * as generoFilmeService from '../services/GeneroFilmeService';

export const criarGeneroFilme = async (req: Request, res: Response): Promise<void> => {
  const parseResult = generoFilmeSchema.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({ errors: parseResult.error.errors });
    return;
  }

  try {
    const generoFilme = await generoFilmeService.criarGeneroFilme(parseResult.data);
    res.status(201).json(generoFilme);
    return;
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar relacionamento entre filme e gênero", details: err });
    return;
  }
};

export const listarGenerosFilme = async (req: Request, res: Response) => {
  try {
    const generosFilme = await generoFilmeService.listarGenerosFilme();
    res.json(generosFilme);
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar relacionamento(s) entre filme e gênero", details: err });
  }
};

export const buscarGeneroFilme = async (req: Request, res: Response) => {
  const { idFilme, idGenero } = req.params;
  try {
    const generoFilme = await generoFilmeService.buscarGeneroFilme(Number(idFilme), Number(idGenero));
    res.json(generoFilme);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar relacionamento entre filme e gênero", details: err });
  }
};

export const atualizarGeneroFilme = async (req: Request, res: Response) => {
  const { idFilme, idGenero } = req.params;
  try {
    const generoFilme = await generoFilmeService.atualizarGeneroFilme(
      Number(idFilme),
      Number(idGenero),
      req.body
    );
    res.json(generoFilme);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar relacionamento entre filme e gênero", details: err });
  }
};

export const deletarGeneroFilme = async (req: Request, res: Response) => {
  const { idFilme, idGenero } = req.params;
  try {
    const generoFilme = await generoFilmeService.deletarGeneroFilme(Number(idFilme), Number(idGenero));
    res.json(generoFilme);
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar relacionamento entre filme e gênero", details: err });
  }
};