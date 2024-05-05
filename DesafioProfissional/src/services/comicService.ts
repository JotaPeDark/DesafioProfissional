// src/services/comicService.ts

import { getDatabase } from './mongoDBService';
import { ObjectId } from 'mongodb';
import { Comic } from '../models/Comics'; // Importar a model de quadrinhos

// Função para verificar se o quadrinho está associado à saga "Civil War"
function isCivilWarComic(comic: Comic): boolean {
  // Aqui você pode adicionar a lógica para verificar se o quadrinho está associado à saga "Civil War"
  // Verifica se o ID do evento "Civil War" está presente nos eventos do quadrinho
  return comic.events.items.some(event => event.id === 238); // ID 238 é para "Civil War"
}

async function insertComic(comicData: Comic) {
  try {
    if (isCivilWarComic(comicData)) {
      const db = getDatabase();
      const result = await db.collection('comics').insertOne(comicData);
      return result.insertedId;
    } else {
      throw new Error('O quadrinho não pertence à saga "Civil War"');
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Erro ao inserir quadrinho: ' + error.message);
    } else {
      throw new Error('Erro desconhecido ao inserir quadrinho');
    }
  }
}

async function findComicById(comicId: string) {
  try {
    const db = getDatabase();
    const comic = await db.collection('comics').findOne({ _id: new ObjectId(comicId) });
    return comic;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Erro ao encontrar quadrinho por ID: ' + error.message);
    } else {
      throw new Error('Erro desconhecido ao encontrar quadrinho por ID');
    }
  }
}

async function updateComic(comicId: string, updatedData: Partial<Comic>) {
  try {
    const db = getDatabase();
    const result = await db.collection('comics').updateOne(
      { _id: new ObjectId(comicId) },
      { $set: updatedData }
    );
    return result.modifiedCount > 0;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Erro ao atualizar quadrinho: ' + error.message);
    } else {
      throw new Error('Erro desconhecido ao atualizar quadrinho');
    }
  }
}

async function deleteComic(comicId: string) {
  try {
    const db = getDatabase();
    const result = await db.collection('comics').deleteOne({ _id: new ObjectId(comicId) });
    return result.deletedCount > 0;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Erro ao excluir quadrinho: ' + error.message);
    } else {
      throw new Error('Erro desconhecido ao excluir quadrinho');
    }
  }
}

export { insertComic, findComicById, updateComic, deleteComic };
