import * as generoFilmeService from '../services/GeneroFilmeService';
import { Request, Response } from 'express';

export const criarGeneroFilme = async (req: Request, res: Response) => {
  const generoFilme = await generoFilmeService.criarGeneroFilme(req.body);
  res.json(generoFilme);
};

export const listarGenerosFilme = async (req: Request, res: Response) => {
  const generosFilme = await generoFilmeService.listarGenerosFilme();
  res.json(generosFilme);
};

export const buscarGeneroFilme = async (req: Request, res: Response) => {
  const { idFilme, idGenero } = req.params;
  const generoFilme = await generoFilmeService.buscarGeneroFilme(Number(idFilme), Number(idGenero));
  res.json(generoFilme);
};

export const atualizarGeneroFilme = async (req: Request, res: Response) => {
  const { idFilme, idGenero } = req.params;
  const generoFilme = await generoFilmeService.atualizarGeneroFilme(
    Number(idFilme),
    Number(idGenero),
    req.body
  );
  res.json(generoFilme);
};

export const deletarGeneroFilme = async (req: Request, res: Response) => {
  const { idFilme, idGenero } = req.params;
  const generoFilme = await generoFilmeService.deletarGeneroFilme(Number(idFilme), Number(idGenero));
  res.json(generoFilme);
};