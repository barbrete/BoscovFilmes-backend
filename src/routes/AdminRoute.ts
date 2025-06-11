import { Router } from 'express';
import * as filmesController from '../controllers/FilmesController';
import * as usuarioController from '../controllers/UsuarioController';

const router = Router();

router.get('/', (req, res) => {
  res.send('Painel Administrativo - Acesso permitido');
});

router.get('/usuarios', async (req, res) => {
  res.json({ message: 'Lista de usuários para admin' });
});

router.post('/filmes', filmesController.criarFilme);
router.put('/filmes/:id', filmesController.atualizarFilme);
router.delete('/filmes/:id', filmesController.deletarFilme);




export default router;