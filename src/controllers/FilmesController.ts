import * as filmeService from '../services/FilmeService';
import { Request, Response } from 'express';
import { filmeSchema } from '../shemas/FilmeSchema';

/**
 * @swagger
 * /filmes:
 *   post:
 *     summary: Cria um novo filme
 *     tags: [Filmes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Dados do filme a ser criado
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Inception"
 *               diretor:
 *                 type: string
 *                 example: "Christopher Nolan"
 *               anoLancamento:
 *                 type: string
 *                 format: date-time
 *                 example: "2010-07-16T00:00:00.000Z"
 *               duracao:
 *                 type: number
 *                 example: 148
 *               produtora:
 *                 type: string
 *                 example: "Warner Bros."
 *               classificacao:
 *                 type: string
 *                 example: "PG-13"
 *               poster:
 *                 type: string
 *                 example: "https://image.tmdb.org/t/p/original/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg"
 *     responses:
 *       201:
 *         description: Filme criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 1
 *                 nome:
 *                   type: string
 *                   example: "Inception"
 *       500:
 *         description: Erro interno ao criar o filme
 */
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

/**
 * @swagger
 * /filmes:
 *   get:
 *     summary: Lista todos os filmes
 *     tags: [Filmes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de filmes retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     example: 1
 *                   nome:
 *                     type: string
 *                     example: "Inception"
 *       500:
 *         description: Erro interno ao listar filmes
 */
export const listarFilmes = async (req: Request, res: Response) => {
  const filmes = await filmeService.listarFilmes();
  res.json(filmes);
};

/**
 * @swagger
 * /filmes/{id}:
 *   get:
 *     summary: Busca um filme pelo seu ID
 *     tags: [Filmes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do filme a ser buscado
 *     responses:
 *       200:
 *         description: Filme encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 1
 *                 nome:
 *                   type: string
 *                   example: "Inception"
 *       500:
 *         description: Erro interno ao buscar o filme
 */
export const buscarFilmePorId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const filme = await filmeService.buscarFilmePorId(Number(id));
  res.json(filme);
};

/**
 * @swagger
 * /filmes/{id}:
 *   put:
 *     summary: Atualiza os dados de um filme existente
 *     tags: [Filmes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do filme a ser atualizado
 *     requestBody:
 *       description: Dados atualizados do filme
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Inception Renovado"
 *               diretor:
 *                 type: string
 *                 example: "Christopher Nolan"
 *     responses:
 *       200:
 *         description: Filme atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 1
 *                 nome:
 *                   type: string
 *                   example: "Inception Renovado"
 *       500:
 *         description: Erro interno ao atualizar o filme
 */
export const atualizarFilme = async (req: Request, res: Response) => {
  const { id } = req.params;
  const filme = await filmeService.atualizarFilme(Number(id), req.body);
  res.json(filme);
};

/**
 * @swagger
 * /filmes/{id}:
 *   delete:
 *     summary: Deleta um filme existente
 *     tags: [Filmes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do filme a ser deletado
 *     responses:
 *       200:
 *         description: Filme deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Filme deletado com sucesso"
 *       500:
 *         description: Erro interno ao deletar o filme
 */
export const deletarFilme = async (req: Request, res: Response) => {
  const { id } = req.params;
  const filme = await filmeService.deletarFilme(Number(id));
  res.json(filme);
};