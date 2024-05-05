// src/controllers/comicController.ts

import { Request, Response } from 'express';
import { insertComic, findComicById, updateComic, deleteComic } from '../services/comicService';
import { Comic } from '../models/Comics'; // Importar a interface de quadrinhos

// Endpoint para criar um novo quadrinho da saga "Civil War"
async function createComic(req: Request, res: Response) {
  try {
    const comicData: Comic = req.body; // Obter dados do corpo da requisição
    // Lógica para garantir que o quadrinho pertence à saga "Civil War"
    if (isCivilWarComic(comicData)) {
      const newComicId = await insertComic(comicData); // Inserir quadrinho no banco de dados
      res.status(201).json({ message: 'Quadrinho da saga "Civil War" criado com sucesso', comicId: newComicId });
    } else {
      res.status(400).json({ message: 'O quadrinho não pertence à saga "Civil War"' });
    }
  } catch (error) {
    console.error('Erro ao criar quadrinho da saga "Civil War":', error);
    res.status(500).json({ message: 'Erro ao criar quadrinho da saga "Civil War"' });
  }
}

// Endpoint para obter um quadrinho da saga "Civil War" por ID
async function getComicById(req: Request, res: Response) {
  try {
    const comicId = req.params.id; // Obter ID do quadrinho da URL
    const comic = await findComicById(comicId); // Buscar quadrinho no banco de dados
    if (comic) {
      // Verificar se o quadrinho pertence à saga "Civil War"
      if (isCivilWarComic(comic)) {
        res.json(comic); // Retornar quadrinho encontrado
      } else {
        res.status(404).json({ message: 'Quadrinho não encontrado na saga "Civil War"' });
      }
    } else {
      res.status(404).json({ message: 'Quadrinho não encontrado' }); // Retornar erro se o quadrinho não foi encontrado
    }
  } catch (error) {
    console.error('Erro ao obter quadrinho da saga "Civil War" por ID:', error);
    res.status(500).json({ message: 'Erro ao obter quadrinho da saga "Civil War" por ID' });
  }
}

// Endpoint para atualizar um quadrinho da saga "Civil War" por ID
async function updateComicById(req: Request, res: Response) {
  try {
    const comicId = req.params.id; // Obter ID do quadrinho da URL
    const updatedData: Partial<Comic> = req.body; // Obter dados atualizados do corpo da requisição
    const comic = await findComicById(comicId); // Buscar quadrinho no banco de dados
    if (comic) {
      // Verificar se o quadrinho pertence à saga "Civil War"
      if (isCivilWarComic(comic)) {
        const result = await updateComic(comicId, updatedData); // Atualizar quadrinho no banco de dados
        if (result) {
          res.json({ message: 'Quadrinho da saga "Civil War" atualizado com sucesso' });
        } else {
          res.status(404).json({ message: 'Quadrinho não encontrado na saga "Civil War"' }); // Retornar erro se o quadrinho não foi encontrado
        }
      } else {
        res.status(400).json({ message: 'O quadrinho não pertence à saga "Civil War"' });
      }
    } else {
      res.status(404).json({ message: 'Quadrinho não encontrado' }); // Retornar erro se o quadrinho não foi encontrado
    }
  } catch (error) {
    console.error('Erro ao atualizar quadrinho da saga "Civil War" por ID:', error);
    res.status(500).json({ message: 'Erro ao atualizar quadrinho da saga "Civil War" por ID' });
  }
}


// Endpoint para excluir um quadrinho da saga "Civil War" por ID
async function deleteComicById(req: Request, res: Response) {
  try {
    const comicId = req.params.id; // Obter ID do quadrinho da URL
    // Lógica para garantir que apenas quadrinhos da saga "Civil War" sejam excluídos
    const result = await deleteComic(comicId); // Excluir quadrinho do banco de dados
    if (result) {
      res.json({ message: 'Quadrinho da saga "Civil War" excluído com sucesso' });
    } else {
      res.status(404).json({ message: 'Quadrinho não encontrado na saga "Civil War"' }); // Retornar erro se o quadrinho não foi encontrado
    }
  } catch (error) {
    console.error('Erro ao excluir quadrinho da saga "Civil War" por ID:', error);
    res.status(500).json({ message: 'Erro ao excluir quadrinho da saga "Civil War" por ID' });
  }
}

// Função para verificar se o quadrinho pertence à saga "Civil War"
function isCivilWarComic(comic: Comic): boolean {
  return comic.title.toLowerCase().includes('civil war') || comic.description.toLowerCase().includes('civil war');
}

export { createComic, getComicById, updateComicById, deleteComicById };
