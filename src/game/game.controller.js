import { generateRandomGameToken } from "../auth/auth.utils.js";
import { retrievePresetCharacterByName } from "../character/character.model.js";
import { getUserInfoById } from "../user/user.model.js";
import {
  createGame,
  retrieveGameByGameCode,
  addPlayerToGameById,
  addActiveCharacterToGameById,
  updateActivePlayerStampPositionInGameById
} from "./game.model.js";

export const createGameController = (req, res) => {
  const newGameId = generateRandomGameToken();
  const { gameName, maxPlayers, table } = req.body;
  let board;
  if (table === "default") {
    board = "defaultboard.jpg";
  } else {
    board = req.file.originalname;
  }
  createGame(newGameId, gameName, req.email, maxPlayers, board);

  res.status(200).send();
};

export const joinGameController = async (req, res) => {
  const game = await retrieveGameByGameCode(req.body.gameCode);

  if (game.players.find((v) => v === req.email)) {
    res.status(409).send("player already joined");
  } else if (game.status === "FULL") {
    res.status(409).send("game full");
  } else {
    addPlayerToGameById(req.email, game);
    res.status(200).send("OK");
  }
};

export const getGameSessionController = async (req, res) => {
  const game = await retrieveGameByGameCode(req.params.gameCode);
  if(game.players.some(p => p.user === req.email) || req.email === game.master){
    res.status(200).send(game);
  }else{
    res.status(403).send();
  }
 
};

export const updateActivePlayerController = async (req, res) => {
    addActiveCharacterToGameById(req.body.characterName, req.params.gameCode, req.email);
    res.status(200).send();
};

export const refreshActivePlayerStampController = async (req, res) => {
  updateActivePlayerStampPositionInGameById(req.body.position, req.params.gameCode, req.email);
  res.status(200).send();
}
