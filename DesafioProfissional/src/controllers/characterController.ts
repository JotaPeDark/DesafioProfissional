// src/controllers/characterController.ts

import { Request, Response } from 'express';
import { fetchCharacters } from '../services/marvelApiService';
import { Character } from '../models/Character'; // Importar a model de Character
import { insertCharacter, findCharacterById, updateCharacter, deleteCharacter } from '../services/characterService';

// Endpoint para obter todos os personagens da saga "Civil War"
async function getAllCivilWarCharacters(req: Request, res: Response) {
    try {
        const characters: Character[] = await fetchCharacters();
        // Lógica para filtrar apenas os personagens da saga "Civil War"
        const civilWarCharacters = characters.filter(character => character.isCivilWarCharacter);
        res.json(civilWarCharacters);
    } catch (error) {
        console.error('Erro ao obter personagens da saga "Civil War":', error);
        res.status(500).json({ message: 'Erro ao obter personagens da saga "Civil War"' });
    }
}



// Endpoint para criar um novo personagem da saga "Civil War"
async function createCivilWarCharacter(req: Request, res: Response) {
    try {
        const characterData = req.body;
        // Lógica para garantir que o personagem criado pertença à saga "Civil War"
        const newCharacterId = await insertCharacter(characterData);
        res.status(201).json({ message: 'Personagem da saga "Civil War" criado com sucesso', characterId: newCharacterId });
    } catch (error) {
        console.error('Erro ao criar personagem da saga "Civil War":', error);
        res.status(500).json({ message: 'Erro ao criar personagem da saga "Civil War"' });
    }
}

// Endpoint para obter um personagem da saga "Civil War" por ID
async function getCivilWarCharacterById(req: Request, res: Response) {
    try {
        const characterId = req.params.id;
        const character = await findCharacterById(characterId);
        if (character) {
            // Verifica se o personagem pertence à saga "Civil War"
            if (character.isCivilWarCharacter) {
                res.json(character);
            } else {
                res.status(404).json({ message: 'Personagem não encontrado na saga "Civil War"' });
            }
        } else {
            res.status(404).json({ message: 'Personagem não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao obter personagem da saga "Civil War" por ID:', error);
        res.status(500).json({ message: 'Erro ao obter personagem da saga "Civil War" por ID' });
    }
}

// Endpoint para atualizar um personagem da saga "Civil War"
async function updateCivilWarCharacterById(req: Request, res: Response) {
    try {
        const characterId = req.params.id;
        const updatedData = req.body;
        // Lógica para garantir que apenas personagens da saga "Civil War" sejam atualizados
        const result = await updateCharacter(characterId, updatedData);
        if (result) {
            res.json({ message: 'Personagem da saga "Civil War" atualizado com sucesso' });
        } else {
            res.status(404).json({ message: 'Personagem não encontrado na saga "Civil War"' });
        }
    } catch (error) {
        console.error('Erro ao atualizar personagem da saga "Civil War" por ID:', error);
        res.status(500).json({ message: 'Erro ao atualizar personagem da saga "Civil War" por ID' });
    }
}

// Endpoint para excluir um personagem da saga "Civil War"
async function deleteCivilWarCharacterById(req: Request, res: Response) {
    try {
        const characterId = req.params.id;
        // Lógica para garantir que apenas personagens da saga "Civil War" sejam excluídos
        const result = await deleteCharacter(characterId);
        if (result) {
            res.json({ message: 'Personagem da saga "Civil War" excluído com sucesso' });
        } else {
            res.status(404).json({ message: 'Personagem não encontrado na saga "Civil War"' });
        }
    } catch (error) {
        console.error('Erro ao excluir personagem da saga "Civil War" por ID:', error);
        res.status(500).json({ message: 'Erro ao excluir personagem da saga "Civil War" por ID' });
    }
}

export { getAllCivilWarCharacters, createCivilWarCharacter, getCivilWarCharacterById, updateCivilWarCharacterById, deleteCivilWarCharacterById };
