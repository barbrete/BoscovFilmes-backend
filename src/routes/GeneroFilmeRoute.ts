import { Router } from 'express';
import * as generoFilmeController from '../controllers/GeneroFilmeController';

const router = Router();

router.post('/', generoFilmeController.criarGeneroFilme);
router.get('/', generoFilmeController.listarGenerosFilme);
router.get('/:idFilme/:idGenero', generoFilmeController.buscarGeneroFilme);
router.put('/:idFilme/:idGenero', generoFilmeController.atualizarGeneroFilme);
router.delete('/:idFilme/:idGenero', generoFilmeController.deletarGeneroFilme);

export default router;