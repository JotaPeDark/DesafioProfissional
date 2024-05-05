// src/services/characterService.ts

import { getDatabase } from './mongoDBService';
import { ObjectId } from 'mongodb';
import { Character } from '../models/Character'; // Importar a model de Character

// Função para verificar se o personagem está associado a uma saga específica
function isCharacterInSaga(character: Character, sagaTitle: string): boolean {
  // Verifica se o campo events contém algum evento relacionado à saga especificada
  return character.events.items.some(event => event.id === 238); // ID 238 é para "Civil War"
}

async function insertCharacter(characterData: Character) {
  try {
    if (isCharacterInSaga(characterData, 'Civil War')) {
      const db = getDatabase();
      const result = await db.collection('characters').insertOne(characterData);
      return result.insertedId;
    } else {
      throw new Error('O personagem não pertence à saga "Civil War"');
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Erro ao inserir personagem: ' + error.message);
    } else {
      throw new Error('Erro desconhecido ao inserir personagem');
    }
  }
}

async function findCharacterById(characterId: string) {
  try {
    const db = getDatabase();
    const character = await db.collection('characters').findOne({ _id: new ObjectId(characterId) });
    return character;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Erro ao encontrar personagem por ID: ' + error.message);
    } else {
      throw new Error('Erro desconhecido ao encontrar personagem por ID');
    }
  }
}

async function updateCharacter(characterId: string, updatedData: Partial<Character>) {
  try {
    const db = getDatabase();
    const result = await db.collection('characters').updateOne(
      { _id: new ObjectId(characterId) },
      { $set: updatedData }
    );
    return result.modifiedCount > 0;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Erro ao atualizar personagem: ' + error.message);
    } else {
      throw new Error('Erro desconhecido ao atualizar personagem');
    }
  }
}

async function deleteCharacter(characterId: string) {
  try {
    const db = getDatabase();
    const result = await db.collection('characters').deleteOne({ _id: new ObjectId(characterId) });
    return result.deletedCount > 0;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Erro ao excluir personagem: ' + error.message);
    } else {
      throw new Error('Erro desconhecido ao excluir personagem');
    }
  }
}

export { insertCharacter, findCharacterById, updateCharacter, deleteCharacter };
