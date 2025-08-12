# 🛠 Back-End — BoscovFilmes 

> Este é o backend do projeto BoscovFilmes, responsável por fornecer as APIs e toda a lógica de negócio para o frontend.
Foi desenvolvido em Node.js com TypeScript, utilizando Express para o servidor HTTP e Zod para validação de dados.
O sistema permite que usuários se cadastrem, façam login, naveguem pelo catálogo de filmes, deixem avaliações e acompanhem seu histórico. Possui autenticação e autorização para garantir segurança e controle de acesso, além de um painel administrativo.
---

## 📌 Índice

* [📂 Estrutura](#-estrutura)
* [🚀 Tecnologias](#-tecnologias)
* [📦 Instalação](#-instalação)
* [⚙️ Configuração](#️-configuração)
* [▶️ Execução](#️-execução)
* [📑 Documentação da API](#-documentação)
* [🛡 Validação](#-validação)

---

## 📂 Estrutura

```
src/
  ├── config/         # Configura a documentação
  ├── controllers/    # Controla as requisições
  ├── middlewares/    # Validação e autenticação
  ├── routes/         # Definição das rotas
  ├── services/       # Lógica de negócio 
  ├── schemas/        # Schemas do Zod
  ├── app.ts          # Configuração do Express
  └── server.ts       # Inicialização do servidor
```

---

## 🚀 Tecnologias

| Tecnologia              | Uso                   |
| ----------------------- | --------------------- |
| **Node.js**             | Ambiente de execução  |
| **TypeScript**          | Tipagem estática      |
| **Express**             | Framework web         |
| **Zod**                 | Validação de dados    |
| **Prisma**              | ORM                   |
| **dotenv**              | Variáveis de ambiente |
| **JWT**                 | Autenticação          |
| **CORS**                | Segurança de acesso   |

---

## 📦 Instalação

```bash
git clone https://github.com/barbrete/BoscovFilmes-backend.git
cd BoscovFilmesAPP
npm i
```

---

## ⚙️ Configuração

Crie um arquivo `.env` baseado no `.env.exemplo`:

```env
PORT=5000
SECRET=uma_chave_segura
DATABASE_URL="postgresql://user:password@localhost:5432/db"
```
Prisma:

```bash
npx prisma migrate dev
```

---

## ▶️ Execução

```bash
npm run dev
```

---

## 📑 Documentação
A API conta com documentação interativa gerada pelo Swagger.
Após iniciar o servidor, acesse:

```bash
http://localhost:3001/api-docs
```

---

## 🛡 Validação

```ts
import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(3, "Nome muito curto"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha muito curta"),
});
```

---

