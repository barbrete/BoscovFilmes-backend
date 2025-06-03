import { Request, Response } from 'express';
import * as avaliacaoService from '../services/AvaliacaoService';

export const criarAvaliacao = async (req: Request, res: Response) => {
  const avaliacao = await avaliacaoService.criarAvaliacao(req.body);
  res.json(avaliacao);
};

export const listarAvaliacoes = async (res: Response) => {
  const avaliacoes = await avaliacaoService.listarAvaliacoes();
  res.json(avaliacoes);
};

export const buscarAvaliacao = async (req: Request, res: Response) => {
  const { idUsuario, idFilme } = req.params;
  const avaliacao = await avaliacaoService.buscarAvaliacao(Number(idUsuario), Number(idFilme));
  res.json(avaliacao);
};

export const atualizarAvaliacao = async (req: Request, res: Response) => {
  const { idUsuario, idFilme } = req.params;
  const avaliacao = await avaliacaoService.atualizarAvaliacao(
    Number(idUsuario),
    Number(idFilme),
    req.body
  );
  res.json(avaliacao);
};

export const deletarAvaliacao = async (req: Request, res: Response) => {
  const { idUsuario, idFilme } = req.params;
  const avaliacao = await avaliacaoService.deletarAvaliacao(Number(idUsuario), Number(idFilme));
  res.json(avaliacao);
};