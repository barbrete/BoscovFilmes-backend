import { Request, Response } from 'express';
import { avaliacaoSchema } from '../shemas/AvaliacaoSchema';
import * as avaliacaoService from '../services/AvaliacaoService';

export const criarAvaliacao = async (req: Request, res: Response): Promise<void> => {
  const parseResult = avaliacaoSchema.safeParse(req.body);
  
  if (!parseResult.success) {
    res.status(400).json({ erros: parseResult.error.errors });
    return;
  }

  try {
    const avaliacao = await avaliacaoService.criarAvaliacao(parseResult.data);
    res.status(201).json(avaliacao);
    return;
  } catch (err) {
    console.log('Erro ao criar avaliação:', err);
    res.status(500).json({ erro: "Erro ao criar avaliação", detalhes: err });
    return;
  }
};

export const listarAvaliacoes = async (req: Request, res: Response) : Promise<void> =>  {
  try {
    const avaliacoes = await avaliacaoService.listarAvaliacoes();
    res.json(avaliacoes);
    return;
  } catch (err: any) {
    if (err.code === 'P2002') {
      res.status(409).json({ erro: "Você já avaliou esse filme." });
      return;
    }
    res.status(500).json({ erro: "Erro ao listar avaliações", detalhes: err });
    return;
  }
};

export const buscarAvaliacao = async (req: Request, res: Response): Promise<void> => {
  const { idUsuario, idFilme } = req.params;
  try {
    const avaliacao = await avaliacaoService.buscarAvaliacao(Number(idUsuario), Number(idFilme));
    res.json(avaliacao);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar avaliação", detalhes: err });
  }
};

export const atualizarAvaliacao = async (req: Request, res: Response): Promise<void> => {
  const { idUsuario, idFilme } = req.params;
  try {
    const avaliacao = await avaliacaoService.atualizarAvaliacao(
      Number(idUsuario),
      Number(idFilme),
      req.body
    );
    res.json(avaliacao);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao atualizar avaliação", detalhes: err });
  }
};

export const deletarAvaliacao = async (req: Request, res: Response): Promise<void> => {
  const { idUsuario, idFilme } = req.params;
  try {
    const avaliacao = await avaliacaoService.deletarAvaliacao(Number(idUsuario), Number(idFilme));
    res.json(avaliacao);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao deletar avaliação", detalhes: err });
  }
};