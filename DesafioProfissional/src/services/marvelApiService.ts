// src/services/marvelApiService.ts

import axios from 'axios';
import md5 from 'md5'; // Certifique-se de instalar o pacote "md5" (npm install md5)

const publicKey = 'abde5a76c7a1bc5d4cd2db537b07a44f';
const privateKey = '60bd86e40275bdb9534f202e9bfb2332f12e7b9d';
const baseUrl = 'https://gateway.marvel.com/v1/public';

// Função para buscar todos os personagens da saga "Civil War"
async function fetchCharacters() {
  const timestamp = new Date().getTime().toString(); // Define o timestamp atual
  const hash = md5(`${timestamp}${privateKey}${publicKey}`); // Calcula o hash
  const response = await axios.get(`${baseUrl}/characters`, {
    params: {
      ts: timestamp,
      apikey: publicKey,
      hash: hash,
      events: 238, // ID 238 é para "Civil War"
    },
  });
  return response.data; // Retorna os dados da resposta da API
}

// Função para buscar todos os quadrinhos da saga "Civil War"
async function fetchComics() {
  const timestamp = new Date().getTime().toString(); // Define o timestamp atual
  const hash = md5(`${timestamp}${privateKey}${publicKey}`); // Calcula o hash
  const response = await axios.get(`${baseUrl}/comics`, {
    params: {
      ts: timestamp,
      apikey: publicKey,
      hash: hash,
      events: 238, // ID 238 é para "Civil War"
    },
  });
  return response.data; // Retorna os dados da resposta da API
}

// Função para buscar todos os criadores da saga "Civil War"
async function fetchCreators() {
  const timestamp = new Date().getTime().toString(); // Define o timestamp atual
  const hash = md5(`${timestamp}${privateKey}${publicKey}`); // Calcula o hash
  const response = await axios.get(`${baseUrl}/creators`, {
    params: {
      ts: timestamp,
      apikey: publicKey,
      hash: hash,
      events: 238, // ID 238 é para "Civil War"
    },
  });
  return response.data; // Retorna os dados da resposta da API
}

export { fetchCharacters, fetchComics, fetchCreators };
