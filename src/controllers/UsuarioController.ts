import { Request, Response } from 'express';
import { usuarioSchema } from '../shemas/UsuarioSchema';
import * as usuarioService from '../services/UsuarioService';

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       description: Dados do usuário a ser criado
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "João da Silva"
 *               email:
 *                 type: string
 *                 example: "joao@example.com"
 *               password:
 *                 type: string
 *                 example: "senha123"
 *               apelido:
 *                 type: string
 *                 example: "joaoS"
 *               data_nascimento:
 *                 type: string
 *                 format: date-time
 *                 example: "1990-01-01T00:00:00.000Z"
 *               status:
 *                 type: boolean
 *                 example: true
 *               tipo_usuario:
 *                 type: string
 *                 example: "user"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
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
 *                   example: "João da Silva"
 *                 email:
 *                   type: string
 *                   example: "joao@example.com"
 *       400:
 *         description: Dados inválidos para criação do usuário
 *       500:
 *         description: Erro interno ao criar o usuário
 */
export const criarUsuario = async (req: Request, res: Response): Promise<void> => {
  const parseResult = usuarioSchema.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({ errors: parseResult.error.errors });
    return;
  }
  try {
    const usuario = await usuarioService.criarUsuario(parseResult.data);
    res.status(201).json(usuario);
    return;
  } catch (err) {
    console.log('Erro ao criar usuario:', err);
    res.status(500).json({ error: "Erro ao criar usuário", details: err });
    return;
  }
};

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
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
 *                     example: "João da Silva"
 *                   email:
 *                     type: string
 *                     example: "joao@example.com"
 *       500:
 *         description: Erro interno ao listar usuários
 */
export const listarUsuarios = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuarios = await usuarioService.listarUsuarios();
    res.json(usuarios);
    return;
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar usuários", details: err });
    return;
  }
};

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Busca um usuário pelo seu ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do usuário a ser buscado
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso
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
 *                   example: "João da Silva"
 *                 email:
 *                   type: string
 *                   example: "joao@example.com"
 *       500:
 *         description: Erro interno ao buscar o usuário
 */
export const buscarUsuarioPorId = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const usuario = await usuarioService.buscarUsuarioPorId(Number(id));
    res.json(usuario);
    return;
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar usuário", details: err });
    return;
  }
};

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Atualiza as informações de um usuário existente
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do usuário a ser atualizado
 *     requestBody:
 *       description: Dados a atualizar do usuário (parcialmente opcionais)
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "João da Silva Atualizado"
 *               email:
 *                 type: string
 *                 example: "joao_atualizado@example.com"
 *               apelido:
 *                 type: string
 *                 example: "joaoNovo"
 *               data_nascimento:
 *                 type: string
 *                 format: date-time
 *                 example: "1990-01-01T00:00:00.000Z"
 *               status:
 *                 type: boolean
 *                 example: true
 *               tipo_usuario:
 *                 type: string
 *                 example: "user"
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
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
 *                   example: "João da Silva Atualizado"
 *                 email:
 *                   type: string
 *                   example: "joao_atualizado@example.com"
 *       400:
 *         description: Dados inválidos para atualização do usuário
 *       500:
 *         description: Erro interno ao atualizar o usuário
 */
export const atualizarUsuario = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const parseResult = usuarioSchema.partial().safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({ errors: parseResult.error.errors });
    return;
  }
  try {
    const usuario = await usuarioService.atualizarUsuario(Number(id), parseResult.data);
    res.json(usuario);
    return;
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar usuário", details: err });
    return;
  }
};

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Deleta um usuário existente
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do usuário a ser deletado
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Usuário deletado com sucesso"
 *       500:
 *         description: Erro interno ao deletar o usuário
 */
export const deletarUsuario = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const usuario = await usuarioService.deletarUsuario(Number(id));
    res.json(usuario);
    return;
  } catch (err) {
    console.log('Erro ao deletar usuario:', err);
    res.status(500).json({ error: "Erro ao deletar usuário", details: err });
    return;
  }
};