import { Request, Response } from 'express';
import * as AuthService from '../services/AuthService';

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