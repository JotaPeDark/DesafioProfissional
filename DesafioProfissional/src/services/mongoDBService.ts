// src/services/mongoDBService.ts

import { MongoClient, Db, MongoClientOptions } from 'mongodb';

const mongoUrl = 'mongodb://localhost:27017/marvel'; // Substitua pela sua URL de conexão
const dbName = 'marvel'; // Nome do banco de dados

let db: Db | null = null; // Inicializamos como null

async function connectToDatabase() {
  try {
    const client = await MongoClient.connect(mongoUrl);
    db = client.db(dbName);
    console.log('Conectado ao banco de dados MongoDB');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados MongoDB:', error);
    throw error;
  }
}

function getDatabase(): Db {
  if (!db) {
    throw new Error('Chame connectToDatabase primeiro!');
  }
  return db;
}

export { connectToDatabase, getDatabase };
