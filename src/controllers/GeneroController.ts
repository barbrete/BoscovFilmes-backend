import { Request, Response } from 'express';
import { generoSchema } from '../shemas/GeneroSchema';
import * as generoService from '../services/GeneroService';

/**
 * @swagger
 * /generos:
 *   post:
 *     summary: Cria um novo gênero
 *     tags: [Gêneros]
 *     requestBody:
 *       description: Dados do gênero a ser criado
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Ação"
 *     responses:
 *       201:
 *         description: Gênero criado com sucesso
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
 *                   example: "Ação"
 *       400:
 *         description: Dados inválidos para a criação do gênero
 *       500:
 *         description: Erro interno ao criar o gênero
 */
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

/**
 * @swagger
 * /generos:
 *   get:
 *     summary: Lista todos os gêneros
 *     tags: [Gêneros]
 *     responses:
 *       200:
 *         description: Lista de gêneros retornada com sucesso
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
 *                     example: "Ação"
 *       500:
 *         description: Erro interno ao listar os gêneros
 */
export const listarGeneros = async (req: Request, res: Response) => {
  try {
    const generos = await generoService.listarGeneros();
    res.json(generos);
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar gêneros", details: err });
  }
};

/**
 * @swagger
 * /generos/{id}:
 *   get:
 *     summary: Busca um gênero pelo seu ID
 *     tags: [Gêneros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do gênero a ser buscado
 *     responses:
 *       200:
 *         description: Gênero encontrado com sucesso
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
 *                   example: "Ação"
 *       500:
 *         description: Erro interno ao buscar o gênero
 */
export const buscarGeneroPorId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const genero = await generoService.buscarGeneroPorId(Number(id));
    res.json(genero);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar gênero", details: err });
  }
};

/**
 * @swagger
 * /generos/{id}:
 *   put:
 *     summary: Atualiza os dados de um gênero existente
 *     tags: [Gêneros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do gênero a ser atualizado
 *     requestBody:
 *       description: Dados atualizados do gênero
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Aventura"
 *     responses:
 *       200:
 *         description: Gênero atualizado com sucesso
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
 *                   example: "Aventura"
 *       500:
 *         description: Erro interno ao atualizar o gênero
 */
export const atualizarGenero = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const genero = await generoService.atualizarGenero(Number(id), req.body);
    res.json(genero);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar gênero", details: err });
  }
};

/**
 * @swagger
 * /generos/{id}:
 *   delete:
 *     summary: Deleta um gênero existente
 *     tags: [Gêneros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do gênero a ser deletado
 *     responses:
 *       200:
 *         description: Gênero deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Gênero deletado com sucesso"
 *       500:
 *         description: Erro interno ao deletar o gênero
 */
export const deletarGenero = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const genero = await generoService.deletarGenero(Number(id));
    res.json(genero);
  } catch (err) {
    console.error("Erro ao excluir gênero:", err);
    res.status(500).json({ error: "Erro ao deletar gênero", details: err });
  }
};