import { Request, Response } from 'express';
import * as AuthService from '../services/AuthService';
import bcrypt from 'bcryptjs';
import * as usuarioService from '../services/UsuarioService';

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza o login do usuário
 *     description: Recebe o email e a senha e retorna um token e os dados do usuário se as credenciais forem válidas.
 *     tags: [Autenticação]
 *     requestBody:
 *       description: Dados para autenticação
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@g.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Usuário autenticado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 2
 *                     email:
 *                       type: string
 *                       example: admin@g.com
 *                     tipo_usuario:
 *                       type: string
 *                       example: admin
 *       401:
 *         description: Credenciais inválidas
 */
export const login = async (req: Request, res: Response) => {
  console.log('Body recebido:', req.body);
  const { email, password } = req.body;
  console.log('Email recebido:', email);
  console.log('Password recebido:', password);
  const result = await AuthService.autenticarUsuario(email, password);
  if (!result) {
    res.status(401).json({ mensagem: 'Credenciais inválidas' });
    return;
  }
  res.json(result);
};


/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra um novo usuário
 *     description: Cria um novo usuário para a aplicação.
 *     tags: [Autenticação]
 *     requestBody:
 *       description: Dados para registro do usuário
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
 *         description: Erro interno na criação do usuário
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    // Criptografa a senha antes de salvar
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    
    const novoUsuario = {
      ...req.body,
      password: passwordHash,
    };

    // Chama o serviço que cria o usuário no banco
    const usuario = await usuarioService.criarUsuario(novoUsuario);
    res.status(201).json(usuario);
  } catch (err) {
    res.status(500).json({ error: "Erro ao registrar usuário", details: err });
  }
};