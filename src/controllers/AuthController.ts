import { Request, Response } from 'express';
import * as AuthService from '../services/AuthService';
import bcrypt from 'bcryptjs';
import * as usuarioService from '../services/UsuarioService';

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login do usuário
 *     description: Recebe email e senha e retorna um token se estiver correto.
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: b@g.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Email ou senha inválidos
 */
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await AuthService.autenticarUsuario(email, password);
  if (!result) {
    res.status(401).json({ mensagem: 'Email ou senha inválidos' });
    return;
  }
  
  res.json(result);
};

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Cadastro de usuário
 *     description: Cria um novo usuário no sistema.
 *     tags: [Autenticação]
 *     requestBody:
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
 *                 example: "1990-01-01T00:00:00.000Z"
 *               status:
 *                 type: boolean
 *                 example: true
 *               tipo_usuario:
 *                 type: string
 *                 example: "user"
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const novoUsuario = {
      ...req.body,
      password: passwordHash,
    };
    const usuario = await usuarioService.criarUsuario(novoUsuario);
    res.status(201).json(usuario);
  } catch (err) {
    res.status(500).json({ error: "Erro ao registrar usuário", details: err });
  }
};