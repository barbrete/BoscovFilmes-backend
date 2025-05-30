import express from 'express';
import usuarioRoute from './routes/UsuarioRoute';
import filmeRoute from './routes/FilmesRoute';
import generoRoute from './routes/GeneroRoute';
import generoFilmeRoute from './routes/GeneroFilmeRoute';
import avaliacaoRoute from './routes/AvaliacaoRoute';
import authRoute from './routes/AuthRoute';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API rodando!');
});

app.use('/usuarios', usuarioRoute);
app.use('/filmes', filmeRoute);
app.use('/generos', generoRoute);
app.use('/generos-filme', generoFilmeRoute);
app.use('/avaliacoes', avaliacaoRoute);
app.use('/auth', authRoute);

export default app;