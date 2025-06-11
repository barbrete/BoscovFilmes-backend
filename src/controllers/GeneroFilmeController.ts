import { Request, Response } from 'express';
import { generoFilmeSchema } from '../shemas/GeneroFilmeSchema';
import * as generoFilmeService from '../services/GeneroFilmeService';

/**
 * @swagger
 * /generos-filme:
 *   post:
 *     summary: Cria um relacionamento entre um filme e um gênero
 *     tags: [Relacionamento Filme x Gênero]
 *     requestBody:
 *       description: Dados para criar o relacionamento entre filme e gênero
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idFilme:
 *                 type: number
 *                 example: 1
 *               idGenero:
 *                 type: number
 *                 example: 2
 *     responses:
 *       201:
 *         description: Relacionamento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idFilme:
 *                   type: number
 *                   example: 1
 *                 idGenero:
 *                   type: number
 *                   example: 2
 *       400:
 *         description: Dados inválidos para criar o relacionamento
 *       500:
 *         description: Erro interno ao criar o relacionamento
 */
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

/**
 * @swagger
 * /generos-filme:
 *   get:
 *     summary: Lista todos os relacionamentos entre filmes e gêneros
 *     tags: [Relacionamento Filme x Gênero]
 *     responses:
 *       200:
 *         description: Lista de relacionamentos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idFilme:
 *                     type: number
 *                     example: 1
 *                   idGenero:
 *                     type: number
 *                     example: 2
 *       500:
 *         description: Erro interno ao listar os relacionamentos
 */
export const listarGenerosFilme = async (req: Request, res: Response): Promise<void> => {
  try {
    const generosFilme = await generoFilmeService.listarGenerosFilme();
    res.json(generosFilme);
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar relacionamento(s) entre filme e gênero", details: err });
  }
};

/**
 * @swagger
 * /generos-filme/{idFilme}/{idGenero}:
 *   get:
 *     summary: Busca um relacionamento específico entre filme e gênero
 *     tags: [Relacionamento Filme x Gênero]
 *     parameters:
 *       - in: path
 *         name: idFilme
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do filme
 *       - in: path
 *         name: idGenero
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do gênero
 *     responses:
 *       200:
 *         description: Relacionamento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idFilme:
 *                   type: number
 *                   example: 1
 *                 idGenero:
 *                   type: number
 *                   example: 2
 *       500:
 *         description: Erro interno ao buscar o relacionamento
 */
export const buscarGeneroFilme = async (req: Request, res: Response): Promise<void> => {
  const { idFilme, idGenero } = req.params;
  try {
    const generoFilme = await generoFilmeService.buscarGeneroFilme(Number(idFilme), Number(idGenero));
    res.json(generoFilme);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar relacionamento entre filme e gênero", details: err });
  }
};

/**
 * @swagger
 * /generos-filme/{idFilme}/{idGenero}:
 *   put:
 *     summary: Atualiza um relacionamento existente entre filme e gênero
 *     tags: [Relacionamento Filme x Gênero]
 *     parameters:
 *       - in: path
 *         name: idFilme
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do filme
 *       - in: path
 *         name: idGenero
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do gênero
 *     requestBody:
 *       description: Dados para atualização do relacionamento
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Caso haja outros campos para serem atualizados, defina aqui
 *               exemplo:
 *                 type: string
 *                 example: "valor atualizado"
 *     responses:
 *       200:
 *         description: Relacionamento atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idFilme:
 *                   type: number
 *                   example: 1
 *                 idGenero:
 *                   type: number
 *                   example: 2
 *       500:
 *         description: Erro interno ao atualizar o relacionamento
 */
export const atualizarGeneroFilme = async (req: Request, res: Response): Promise<void> => {
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

/**
 * @swagger
 * /generos-filme/{idFilme}/{idGenero}:
 *   delete:
 *     summary: Deleta um relacionamento entre filme e gênero existente
 *     tags: [Relacionamento Filme x Gênero]
 *     parameters:
 *       - in: path
 *         name: idFilme
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do filme
 *       - in: path
 *         name: idGenero
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do gênero
 *     responses:
 *       200:
 *         description: Relacionamento deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Relacionamento deletado com sucesso"
 *       500:
 *         description: Erro interno ao deletar o relacionamento
 */
export const deletarGeneroFilme = async (req: Request, res: Response): Promise<void> => {
  const { idFilme, idGenero } = req.params;
  try {
    const generoFilme = await generoFilmeService.deletarGeneroFilme(Number(idFilme), Number(idGenero));
    res.json(generoFilme);
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar relacionamento entre filme e gênero", details: err });
  }
};