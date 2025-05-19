import { Router } from 'express';
import * as generoController from '../controllers/GeneroController';

const router = Router();

router.post('/', generoController.criarGenero);
router.get('/', generoController.listarGeneros);
router.get('/:id', generoController.buscarGeneroPorId);
router.put('/:id', generoController.atualizarGenero);
router.delete('/:id', generoController.deletarGenero);

export default router;