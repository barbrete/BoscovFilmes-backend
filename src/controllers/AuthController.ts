import { Request, Response } from 'express';
import * as AuthService from '../services/AuthService';

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

/* 
// Se houver outras funções, adicione blocos de documentação semelhantes.
// Exemplo para um eventual endpoint de registro:
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra um novo usuário
 *     description: Recebe os dados do novo usuário e cria uma conta.
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
 *                 example: joao@example.com
 *               password:
 *                 type: string
 *                 example: "senhaSegura123"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 3
 *                     email:
 *                       type: string
 *                       example: joao@example.com
 *       400:
 *         description: Erro na criação do usuário
 */
// export const register = async (req: Request, res: Response) => { ... }