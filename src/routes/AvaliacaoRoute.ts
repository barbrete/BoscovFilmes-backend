import { Router } from 'express';
import * as avaliacaoController from '../controllers/AvaliacaoController';

const router = Router();

router.post('/', avaliacaoController.criarAvaliacao);
router.get('/', avaliacaoController.listarAvaliacoes);
router.get('/:idUsuario/:idFilme', avaliacaoController.buscarAvaliacao);
router.put('/:idUsuario/:idFilme', avaliacaoController.atualizarAvaliacao);
router.delete('/:idUsuario/:idFilme', avaliacaoController.deletarAvaliacao);

export default router;