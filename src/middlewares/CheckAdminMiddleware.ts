import { Request, Response, NextFunction } from 'express';

export const checkAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const usuario = (req as any).usuario;
  console.log("Verificando se o usuário é admin:", usuario);
  if (!usuario) {
    res.status(401).json({ error: 'Usuário não autenticado.' });
    return;
  }

  if (usuario.tipo_usuario !== 'admin') {
    res.status(403).json({ error: 'Acesso negado. Este recurso é apenas para administradores.' });
    return;
  }

  next();
};