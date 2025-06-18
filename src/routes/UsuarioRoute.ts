import { Router } from 'express';
import * as UsuarioController from '../controllers/UsuarioController';
import { autenticarToken } from '../middlewares/AuthMiddleware';

const router = Router();

router.post('/', autenticarToken, UsuarioController.criarUsuario);
router.get('/', autenticarToken, UsuarioController.listarUsuarios);
router.get('/:id', autenticarToken, UsuarioController.buscarUsuarioPorId);
router.put('/:id', autenticarToken, UsuarioController.atualizarUsuario);
router.delete('/:id', autenticarToken, UsuarioController.deletarUsuario);

export default router;