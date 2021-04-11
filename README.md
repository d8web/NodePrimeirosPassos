# Instruções

Baixar o repositório, configurar a url do banco de dados

Criar um banco de dados chamado Post

Criar as variáveis en um arquivo variables.env exemplo:

NODE_ENV=development
PORT=7777
DATABASE=mongodb://127.0.0.1:27017/blog
SECRET="Gerar chave e inserir aqui"
SMTP_HOST="Inserir Host smtp"
SMTP_PORT="Inserir porta"
SMTP_USER="Inserir usuário"
SMTP_PASS="Inserir senha"
SMTP_NAME="Inserir nome"
SMTP_EMAIL="Inserir email"

Ligar os serviços do mongo db local, se necessário

executar comando npm start ou yarn add para executar o projeto