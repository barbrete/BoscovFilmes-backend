import app from './app';
import express from 'express';
import jwt from 'jsonwebtoken';

const PORT = process.env.PORT || 3000;
const CHAVE_API = process.env.CHAVE_API;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});