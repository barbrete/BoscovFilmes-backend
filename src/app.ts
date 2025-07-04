import express from 'express';
import cors from 'cors';
import usuarioRoute from './routes/UsuarioRoute';
import filmeRoute from './routes/FilmesRoute';
import generoRoute from './routes/GeneroRoute';
import generoFilmeRoute from './routes/GeneroFilmeRoute';
import avaliacaoRoute from './routes/AvaliacaoRoute';
import authRoute from './routes/AuthRoute';
import adminRoute from './routes/AdminRoute';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../config/swagger';
import { autenticarToken } from './middlewares/AuthMiddleware';
import { checkUserStatus } from './middlewares/StatusUserMiddleware';
import { checkAdmin } from './middlewares/CheckAdminMiddleware';

const app = express();
app.use(cors()); 
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API rodando!');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/auth', authRoute);
app.use('/admin', autenticarToken, checkAdmin, adminRoute);
app.use('/filmes', filmeRoute);
app.use('/avaliacoes', avaliacaoRoute);
app.use('/generos', generoRoute);
app.use('/usuarios', usuarioRoute);
app.use('/generos-filme', autenticarToken, checkUserStatus, generoFilmeRoute);

export default app;