import { Router } from 'express';
import * as GeneroController from '../controllers/GeneroController';
import { autenticarToken } from '../middlewares/AuthMiddleware';
import { checkAdmin } from '../middlewares/CheckAdminMiddleware';

const router = Router();

router.post('/', autenticarToken, checkAdmin, GeneroController.criarGenero);
router.get('/', autenticarToken, checkAdmin, GeneroController.listarGeneros);
router.get('/:id', autenticarToken, checkAdmin, GeneroController.buscarGeneroPorId);
router.put('/:id', autenticarToken, checkAdmin, GeneroController.atualizarGenero);
router.delete('/:id', autenticarToken, checkAdmin, GeneroController.deletarGenero);

export default router;