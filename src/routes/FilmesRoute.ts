import { Router } from 'express';
import * as filmesController from '../controllers/FilmesController';
import { autenticarToken } from '../middlewares/AuthMiddleware';
import { checkAdmin } from '../middlewares/CheckAdminMiddleware';

const router = Router();

router.get('/', autenticarToken, filmesController.listarFilmes);
router.get('/:id', autenticarToken, filmesController.buscarFilmePorId);

router.post('/', autenticarToken, checkAdmin, filmesController.criarFilme);
router.put('/:id', autenticarToken, checkAdmin, filmesController.atualizarFilme);
router.delete('/:id', autenticarToken, checkAdmin, filmesController.deletarFilme);

export default router;