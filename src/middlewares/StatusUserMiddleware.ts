import { Request, Response, NextFunction } from 'express';

export const checkUserStatus = (req: Request, res: Response, next: NextFunction): void => {
  const usuario = (req as any).usuario; 

  if (!usuario) {
    res.status(401).json({ error: 'Usuário não autenticado.' });
    return;
  }
  if (!usuario.status) {
    res.status(403).json({ error: 'Usuário desativado. Entre em contato com o administrador.' });
    return;
  }

  next();
};