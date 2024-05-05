// src/controllers/creatorController.ts

import { Request, Response } from 'express';
import { insertCreator, findCreatorById, updateCreator, deleteCreator } from '../services/creatorService';
import { Creator } from '../models/Creators'; // Importar a interface de criadores

// Função para verificar se o criador está associado à saga "Civil War"
function isCivilWarCreator(creator: Creator): boolean {
  // Verifica se o campo events contém algum evento relacionado à saga "Civil War"
  return creator.events.items.some(event => event.title.toLowerCase().includes('civil war'));
}

// Endpoint para criar um novo criador da saga "Civil War"
async function createCivilWarCreator(req: Request, res: Response) {
  try {
    const creatorData: Creator = req.body;
    // Lógica para garantir que o criador pertença à saga "Civil War"
    if (isCivilWarCreator(creatorData)) {
      const insertedId = await insertCreator(creatorData);
      res.status(201).json({ message: 'Criador da saga "Civil War" criado com sucesso', insertedId });
    } else {
      res.status(400).json({ message: 'O criador não pertence à saga "Civil War"' });
    }
  } catch (error) {
    console.error('Erro ao criar criador da saga "Civil War":', error);
    res.status(500).json({ message: 'Erro ao criar criador da saga "Civil War"' });
  }
}

// Endpoint para obter um criador da saga "Civil War" por ID
async function getCivilWarCreatorById(req: Request, res: Response) {
  try {
    const creatorId = req.params.id;
    const creator = await findCreatorById(creatorId);
    if (creator) {
      // Lógica para verificar se o criador pertence à saga "Civil War"
      if (isCivilWarCreator(creator)) {
        res.status(200).json(creator);
      } else {
        res.status(404).json({ message: 'Criador não encontrado na saga "Civil War"' });
      }
    } else {
      res.status(404).json({ message: 'Criador não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao obter criador da saga "Civil War" por ID:', error);
    res.status(500).json({ message: 'Erro ao obter criador da saga "Civil War" por ID' });
  }
}

// Endpoint para atualizar um criador da saga "Civil War" por ID
async function updateCivilWarCreatorById(req: Request, res: Response) {
  try {
    const creatorId = req.params.id;
    const updatedData: Partial<Creator> = req.body;
    const creator = await findCreatorById(creatorId);
    if (creator) {
      // Lógica para garantir que apenas criadores da saga "Civil War" sejam atualizados
      if (isCivilWarCreator(creator)) {
        const success = await updateCreator(creatorId, updatedData);
        if (success) {
          res.status(200).json({ message: 'Criador da saga "Civil War" atualizado com sucesso' });
        } else {
          res.status(404).json({ message: 'Criador não encontrado na saga "Civil War"' });
        }
      } else {
        res.status(400).json({ message: 'O criador não pertence à saga "Civil War"' });
      }
    } else {
      res.status(404).json({ message: 'Criador não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao atualizar criador da saga "Civil War" por ID:', error);
    res.status(500).json({ message: 'Erro ao atualizar criador da saga "Civil War" por ID' });
  }
}

// Endpoint para excluir um criador da saga "Civil War" por ID
async function deleteCivilWarCreatorById(req: Request, res: Response) {
  try {
    const creatorId = req.params.id;
    const creator = await findCreatorById(creatorId);
    if (creator) {
      // Lógica para garantir que apenas criadores da saga "Civil War" sejam excluídos
      if (isCivilWarCreator(creator)) {
        const success = await deleteCreator(creatorId);
        if (success) {
          res.status(200).json({ message: 'Criador da saga "Civil War" excluído com sucesso' });
        } else {
          res.status(404).json({ message: 'Criador não encontrado na saga "Civil War"' });
        }
      } else {
        res.status(400).json({ message: 'O criador não pertence à saga "Civil War"' });
      }
    } else {
      res.status(404).json({ message: 'Criador não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao excluir criador da saga "Civil War" por ID:', error);
    res.status(500).json({ message: 'Erro ao excluir criador da saga "Civil War" por ID' });
  }
}

export { createCivilWarCreator, getCivilWarCreatorById, updateCivilWarCreatorById, deleteCivilWarCreatorById };
