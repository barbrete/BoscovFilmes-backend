import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET = process.env.SECRET || "";

export const autenticarToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(token, SECRET, (err, usuario) => {
    if (err) {
      console.log("Erro na verificação do token:", err);
      res.sendStatus(403);
      return;
    }
    console.log("Token verificado, usuário:", usuario);
    (req as any).usuario = usuario;
    next();
  });
};