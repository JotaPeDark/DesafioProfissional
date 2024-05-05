// index.ts

import express from 'express';
import routes from './src/routes/index'; // Importar as rotas do arquivo index.ts dentro da pasta routes
import { connectToDatabase } from './src/services/mongoDBService'; // Importar a função de conexão com o banco de dados MongoDB

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para fazer o parsing do corpo das requisições
app.use(express.json());

// Middleware para verificar se a requisição é para a saga "Civil War" (ID: 238)
app.use('/api', (req, res, next) => {
  const eventId = req.body.id || req.query.id; // Verifica se o ID do evento está no corpo ou nos parâmetros da requisição
  if (eventId !== '238') {
    return res.status(403).json({ message: 'Acesso negado. Esta rota é permitida apenas para a saga "Civil War".' });
  }
  next(); // Passa para o próximo middleware ou rota
});

// Conecta ao banco de dados MongoDB
connectToDatabase()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida.');

    // Integração das rotas ao aplicativo Express
    app.use('/api', routes);

    // Inicialização do servidor
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados MongoDB:', error);
    process.exit(1); // Encerra o processo Node.js com um código de erro
  });
