# Página de Registro/Login

Projeto simples de formulário de login/registro com frontend estático e backend em Node.js/Express conectado a um banco PostgreSQL.

## 📸 Demonstração

![View](https://github.com/borinigabriel8/login-register-system/blob/main/Screenshot_1.png)
---

![Versão](https://img.shields.io/badge/versão-1.0.0-E50914?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Finalizado-success?style=for-the-badge)
![Licença](https://img.shields.io/badge/Licença-MIT-white?style=for-the-badge)


## Descrição

Este repositório contém um exemplo mínimo de sistema de autenticação:
- Frontend: HTML/CSS/JS em `frontend/` com páginas `login.html` e `register.html`.
- Backend: API em `backend/` usando Express que expõe endpoints para registro e login e persiste usuários em um banco PostgreSQL.

O objetivo é servir como base para estudos e para ser adaptado/estendido em projetos maiores.

## Tecnologias

- Node.js + Express
- PostgreSQL (via `pg`)
- bcrypt (hash de senhas)
- frontend estático (HTML/CSS/JS)

## Estrutura do projeto

```
.
├─ backend/
│  ├─ database.js      # configuração da conexão com Postgres
│  └─ server.js        # API Express (endpoints /, /register, /login)
├─ frontend/
│  ├─ login.html
│  ├─ register.html
│  ├─ script.js
│  └─ style.css
├─ package.json
└─ README.md
```

## Pré-requisitos

- Node.js (versão compatível — veja `package.json`)
- PostgreSQL (uma instância acessível)

## Configuração

1. Copie ou crie um arquivo `.env` dentro da pasta `backend/` (ou na raiz) com a variável abaixo:

```
DATABASE_URL=postgres://usuario:senha@host:porta/nome_do_banco
```

Observação: o `backend/database.js` usa `process.env.DATABASE_URL` e configura `ssl: { rejectUnauthorized: false }` por padrão.

## Instalação

Abra um terminal (PowerShell no Windows) na raiz do projeto e instale dependências:

```powershell
npm install
```

Isso instalará as dependências listadas em `package.json` (express, pg, bcrypt, cors, dotenv, etc.).

## Executando a aplicação

1. Inicie o backend (API):

```powershell
# a partir da raiz do projeto
node backend/server.js
```

O servidor iniciará em `http://localhost:3000` por padrão (ou na porta definida em `process.env.PORT`).

2. Abra o frontend: basta abrir `frontend/login.html` no navegador (duplo clique) ou servir a pasta `frontend` com um servidor estático.

Observação: o frontend atual faz requisições ao backend; se abrir o HTML diretamente via `file://` e houver problemas de CORS, prefira servir a pasta com um servidor estático simples (por exemplo, `npx http-server frontend`).

## Endpoints da API

- GET /
  - Teste: retorna texto indicando que a API está rodando.

- POST /register
  - Corpo (JSON): { "email": "seu@email.com", "password": "sua_senha" }
  - Resposta de sucesso: { "success": true }
  - Erros típicos: { "success": false, "message": "Email já cadastrado" }

- POST /login
  - Corpo (JSON): { "email": "seu@email.com", "password": "sua_senha" }
  - Resposta de sucesso: { "success": true }
  - Possíveis respostas de falha: { "success": false, "message": "Usuário não encontrado" } ou { "success": false, "message": "Senha incorreta" }

## Notas de segurança

- Este projeto armazena senhas usando `bcrypt`, o que é uma prática adequada. Ainda assim, para produção, revise configurações de segurança adicionais (rate-limiting, proteção contra brute force, autenticação baseada em tokens/JWT, HTTPS, validação de input mais robusta).
- Não comite credenciais (arquivo `.env`) no repositório.

## Licença

Projeto de estudo — sem licença específica (adicione uma se desejar).

