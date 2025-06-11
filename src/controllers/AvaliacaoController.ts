import { Request, Response } from 'express';
import { avaliacaoSchema } from '../shemas/AvaliacaoSchema';
import * as avaliacaoService from '../services/AvaliacaoService';

/**
 * @swagger
 * /avaliacoes:
 *   post:
 *     summary: Cria uma nova avaliação para um filme
 *     tags: [Avaliações]
 *     requestBody:
 *       description: Dados da avaliação a ser criada
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
 *                 example: "Filme excelente!"
 *     responses:
 *       201:
 *         description: Avaliação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 15
 *                 idUsuario:
 *                   type: number
 *                   example: 1
 *                 idFilme:
 *                   type: number
 *                   example: 10
 *                 nota:
 *                   type: integer
 *                   example: 5
 *                 comentario:
 *                   type: string
 *                   example: "Filme excelente!"
 *       400:
 *         description: Dados inválidos para criação da avaliação
 *       409:
 *         description: Conflito - Avaliação duplicada
 *       500:
 *         description: Erro interno do servidor
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
    return;
  } catch (err: any) {
    console.log('Erro ao criar avaliação:', err);
    if (err.code === 'P2002') {
      res.status(409).json({ erro: "Você já avaliou esse filme." });
      return;
    }
    res.status(500).json({ erro: "Erro ao criar avaliação", detalhes: err });
    return;
  }
};

/**
 * @swagger
 * /avaliacoes:
 *   get:
 *     summary: Lista todas as avaliações
 *     tags: [Avaliações]
 *     responses:
 *       200:
 *         description: Lista de avaliações retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     example: 15
 *                   idUsuario:
 *                     type: number
 *                     example: 1
 *                   idFilme:
 *                     type: number
 *                     example: 10
 *                   nota:
 *                     type: integer
 *                     example: 5
 *                   comentario:
 *                     type: string
 *                     example: "Filme excelente!"
 *       500:
 *         description: Erro interno do servidor
 */
export const listarAvaliacoes = async (req: Request, res: Response): Promise<void> =>  {
  try {
    const avaliacoes = await avaliacaoService.listarAvaliacoes();
    res.json(avaliacoes);
    return;
  } catch (err: any) {
    res.status(500).json({ erro: "Erro ao listar avaliações", detalhes: err });
    return;
  }
};

/**
 * @swagger
 * /avaliacoes/{idUsuario}/{idFilme}:
 *   get:
 *     summary: Busca avaliação específica pelo id do usuário e do filme
 *     tags: [Avaliações]
 *     parameters:
 *       - in: path
 *         name: idUsuario
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do usuário
 *       - in: path
 *         name: idFilme
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do filme
 *     responses:
 *       200:
 *         description: Avaliação encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 15
 *                 idUsuario:
 *                   type: number
 *                   example: 1
 *                 idFilme:
 *                   type: number
 *                   example: 10
 *                 nota:
 *                   type: integer
 *                   example: 5
 *                 comentario:
 *                   type: string
 *                   example: "Filme excelente!"
 *       500:
 *         description: Erro interno do servidor
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
 *     summary: Atualiza uma avaliação existente
 *     tags: [Avaliações]
 *     parameters:
 *       - in: path
 *         name: idUsuario
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do usuário da avaliação
 *       - in: path
 *         name: idFilme
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do filme da avaliação
 *     requestBody:
 *       description: Dados para atualização da avaliação
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
 *                 example: "Filme bom, mas pode melhorar"
 *     responses:
 *       200:
 *         description: Avaliação atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 15
 *                 idUsuario:
 *                   type: number
 *                   example: 1
 *                 idFilme:
 *                   type: number
 *                   example: 10
 *                 nota:
 *                   type: integer
 *                   example: 4
 *                 comentario:
 *                   type: string
 *                   example: "Filme bom, mas pode melhorar"
 *       500:
 *         description: Erro interno do servidor
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
 *     summary: Deleta uma avaliação existente
 *     tags: [Avaliações]
 *     parameters:
 *       - in: path
 *         name: idUsuario
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do usuário da avaliação a ser deletada
 *       - in: path
 *         name: idFilme
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do filme da avaliação a ser deletada
 *     responses:
 *       200:
 *         description: Avaliação deletada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Avaliação deletada com sucesso"
 *       500:
 *         description: Erro interno do servidor
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