import { Request, Response } from 'express';
import * as AuthService from '../services/AuthService';

export const login = async (req: Request, res: Response) => {
  const { email, senha } = req.body;
  const result = await AuthService.autenticarUsuario(email, senha);
  if (!result) {
    res.status(401).json({ mensagem: 'Credenciais inválidas' });
    return;
  }
  res.json(result);
};