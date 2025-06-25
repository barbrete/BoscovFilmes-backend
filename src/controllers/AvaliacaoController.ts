import { Request, Response } from 'express';
import { avaliacaoSchema } from '../shemas/AvaliacaoSchema';
import * as avaliacaoService from '../services/AvaliacaoService';

/**
 * @swagger
 * /avaliacoes:
 *   post:
 *     summary: Criar avaliação
 *     description: Cria uma nova avaliação para um filme.
 *     tags: [Avaliações]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idUsuario:
 *                 type: number
 *                 example: 1
 *               idFilme:
 *                 type: number
 *                 example: 10
 *               nota:
 *                 type: integer
 *                 example: 5
 *               comentario:
 *                 type: string
 *                 example: "Muito bom!"
 *     responses:
 *       201:
 *         description: Avaliação criada
 *       400:
 *         description: Dados inválidos
 *       409:
 *         description: Avaliação duplicada
 *       500:
 *         description: Erro interno
 */
export const criarAvaliacao = async (req: Request, res: Response): Promise<void> => {
  const parseResult = avaliacaoSchema.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({ erros: parseResult.error.errors });
    return;
  }
  try {
    const avaliacao = await avaliacaoService.criarAvaliacao(parseResult.data);
    res.status(201).json(avaliacao);
  } catch (err: any) {
    if (err.code === 'P2002') {
      res.status(409).json({ erro: "Você já avaliou esse filme." });
      return;
    }
    res.status(500).json({ erro: "Erro ao criar avaliação", detalhes: err });
  }
};

/**
 * @swagger
 * /avaliacoes:
 *   get:
 *     summary: Listar avaliações
 *     description: Lista todas as avaliações.
 *     tags: [Avaliações]
 *     responses:
 *       200:
 *         description: Lista de avaliações
 *       500:
 *         description: Erro interno
 */
export const listarAvaliacoes = async (req: Request, res: Response): Promise<void> =>  {
  try {
    const avaliacoes = await avaliacaoService.listarAvaliacoes();
    res.json(avaliacoes);
  } catch (err: any) {
    res.status(500).json({ erro: "Erro ao listar avaliações", detalhes: err });
  }
};

/**
 * @swagger
 * /avaliacoes/{idUsuario}/{idFilme}:
 *   get:
 *     summary: Buscar avaliação
 *     description: Busca uma avaliação pelo id do usuário e do filme.
 *     tags: [Avaliações]
 *     parameters:
 *       - in: path
 *         name: idUsuario
 *         required: true
 *         schema:
 *           type: number
 *       - in: path
 *         name: idFilme
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Avaliação encontrada
 *       500:
 *         description: Erro interno
 */
export const buscarAvaliacao = async (req: Request, res: Response): Promise<void> => {
  const { idUsuario, idFilme } = req.params;
  try {
    const avaliacao = await avaliacaoService.buscarAvaliacao(Number(idUsuario), Number(idFilme));
    res.json(avaliacao);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar avaliação", detalhes: err });
  }
};

/**
 * @swagger
 * /avaliacoes/{idUsuario}/{idFilme}:
 *   put:
 *     summary: Atualizar avaliação
 *     description: Atualiza uma avaliação existente.
 *     tags: [Avaliações]
 *     parameters:
 *       - in: path
 *         name: idUsuario
 *         required: true
 *         schema:
 *           type: number
 *       - in: path
 *         name: idFilme
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nota:
 *                 type: integer
 *                 example: 4
 *               comentario:
 *                 type: string
 *                 example: "Gostei bastante"
 *     responses:
 *       200:
 *         description: Avaliação atualizada
 *       500:
 *         description: Erro interno
 */
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

/**
 * @swagger
 * /avaliacoes/{idUsuario}/{idFilme}:
 *   delete:
 *     summary: Deletar avaliação
 *     description: Remove uma avaliação existente.
 *     tags: [Avaliações]
 *     parameters:
 *       - in: path
 *         name: idUsuario
 *         required: true
 *         schema:
 *           type: number
 *       - in: path
 *         name: idFilme
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Avaliação deletada
 *       500:
 *         description: Erro interno
 */
export const deletarAvaliacao = async (req: Request, res: Response): Promise<void> => {
  const { idUsuario, idFilme } = req.params;
  try {
    const avaliacao = await avaliacaoService.deletarAvaliacao(Number(idUsuario), Number(idFilme));
    res.json(avaliacao);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao deletar avaliação", detalhes: err });
  }
};