import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET = process.env.CHAVE_API || 'teste';

export const autenticarUsuario = async (email: string, senha: string) => {
  // Usuário fake para teste
  const usuarioFake = {
    id: 1,
    email: 'teste@teste.com',
    password: await bcrypt.hash('123456', 10), // senha: 123456
    tipo_usuario: 'comum'
  };

  if (email !== usuarioFake.email) return null;

  const senhaValida = await bcrypt.compare(senha, usuarioFake.password);
  if (!senhaValida) return null;

  const token = jwt.sign(
    { id: usuarioFake.id, email: usuarioFake.email, tipo: usuarioFake.tipo_usuario },
    SECRET,
    { expiresIn: '1h' }
  );
  return { usuario: usuarioFake, token };
};