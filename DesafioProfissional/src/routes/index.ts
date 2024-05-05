// src/routes/index.ts

import express from 'express';
import { createComic, getComicById, updateComicById, deleteComicById } from '../controllers/comicController';
import { createCivilWarCreator, getCivilWarCreatorById, updateCivilWarCreatorById, deleteCivilWarCreatorById } from '../controllers/creatorController';
import { createCivilWarCharacter, getCivilWarCharacterById, updateCivilWarCharacterById, deleteCivilWarCharacterById } from '../controllers/characterController';

const router = express.Router();

// Rotas para quadrinhos da saga "Civil War"
router.post('/comics', createComic);
router.get('/comics/:id', getComicById);
router.put('/comics/:id', updateComicById);
router.delete('/comics/:id', deleteComicById);

// Rotas para criadores da saga "Civil War"
router.post('/creators', createCivilWarCreator);
router.get('/creators/:id', getCivilWarCreatorById);
router.put('/creators/:id', updateCivilWarCreatorById);
router.delete('/creators/:id', deleteCivilWarCreatorById);

// Rotas para personagens da saga "Civil War"
router.post('/characters', createCivilWarCharacter);
router.get('/characters/:id', getCivilWarCharacterById);
router.put('/characters/:id', updateCivilWarCharacterById);
router.delete('/characters/:id', deleteCivilWarCharacterById);

export default router;
