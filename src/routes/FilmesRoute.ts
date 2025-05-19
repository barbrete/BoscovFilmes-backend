import { Router } from 'express';
import * as filmesController from '../controllers/FilmesController';

const router = Router();

router.post('/', filmesController.criarFilme);
router.get('/', filmesController.listarFilmes);
router.get('/:id', filmesController.buscarFilmePorId);
router.put('/:id', filmesController.atualizarFilme);
router.delete('/:id', filmesController.deletarFilme);

export default router;