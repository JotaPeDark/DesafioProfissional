// src/services/creatorService.ts

import { getDatabase } from './mongoDBService';
import { ObjectId } from 'mongodb';
import { Creator } from '../models/Creators'; // Importar a model de Creator

// Função para verificar se o criador está associado à saga "Civil War"
function isCivilWarCreator(creator: Creator): boolean {
  // Verifica se o campo events contém algum evento relacionado à saga "Civil War"
  return creator.events.items.some(event => event.id === 238); // ID 238 é para "Civil War"
}

async function insertCreator(creatorData: Creator) {
  try {
    if (isCivilWarCreator(creatorData)) {
      const db = getDatabase();
      const result = await db.collection('creators').insertOne(creatorData);
      return result.insertedId;
    } else {
      throw new Error('O criador não está associado à saga "Civil War"');
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Erro ao inserir criador: ' + error.message);
    } else {
      throw new Error('Erro desconhecido ao inserir criador');
    }
  }
}

async function findCreatorById(creatorId: string) {
  try {
    const db = getDatabase();
    const creator = await db.collection('creators').findOne({ _id: new ObjectId(creatorId) });
    return creator;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Erro ao encontrar criador por ID: ' + error.message);
    } else {
      throw new Error('Erro desconhecido ao encontrar criador por ID');
    }
  }
}

async function updateCreator(creatorId: string, updatedData: Partial<Creator>) {
  try {
    const db = getDatabase();
    const result = await db.collection('creators').updateOne(
      { _id: new ObjectId(creatorId) },
      { $set: updatedData }
    );
    return result.modifiedCount > 0;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Erro ao atualizar criador: ' + error.message);
    } else {
      throw new Error('Erro desconhecido ao atualizar criador');
    }
  }
}

async function deleteCreator(creatorId: string) {
  try {
    const db = getDatabase();
    const result = await db.collection('creators').deleteOne({ _id: new ObjectId(creatorId) });
    return result.deletedCount > 0;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Erro ao excluir criador: ' + error.message);
    } else {
      throw new Error('Erro desconhecido ao excluir criador');
    }
  }
}

export { insertCreator, findCreatorById, updateCreator, deleteCreator };
