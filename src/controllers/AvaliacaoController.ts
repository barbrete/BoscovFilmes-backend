import * as avaliacaoService from '../services/AvaliacaoService';

export const criarAvaliacao = async (req, res) => {
  const avaliacao = await avaliacaoService.criarAvaliacao(req.body);
  res.json(avaliacao);
};

export const listarAvaliacoes = async (req, res) => {
  const avaliacoes = await avaliacaoService.listarAvaliacoes();
  res.json(avaliacoes);
};

export const buscarAvaliacao = async (req, res) => {
  const { idUsuario, idFilme } = req.params;
  const avaliacao = await avaliacaoService.buscarAvaliacao(Number(idUsuario), Number(idFilme));
  res.json(avaliacao);
};

export const atualizarAvaliacao = async (req, res) => {
  const { idUsuario, idFilme } = req.params;
  const avaliacao = await avaliacaoService.atualizarAvaliacao(
    Number(idUsuario),
    Number(idFilme),
    req.body
  );
  res.json(avaliacao);
};

export const deletarAvaliacao = async (req, res) => {
  const { idUsuario, idFilme } = req.params;
  const avaliacao = await avaliacaoService.deletarAvaliacao(Number(idUsuario), Number(idFilme));
  res.json(avaliacao);
};