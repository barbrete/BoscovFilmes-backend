import { Router } from 'express';
import * as avaliacaoController from '../controllers/AvaliacaoController';
import { autenticarToken } from '../middlewares/AuthMiddleware';

const router = Router();

router.post('/', autenticarToken, avaliacaoController.criarAvaliacao);
router.get('/', autenticarToken, avaliacaoController.listarAvaliacoes);


router.get('/:idUsuario/:idFilme', autenticarToken, avaliacaoController.buscarAvaliacao);
router.put('/:idUsuario/:idFilme', autenticarToken, avaliacaoController.atualizarAvaliacao);
router.delete('/:idUsuario/:idFilme', autenticarToken, avaliacaoController.deletarAvaliacao);

export default router;