import { MongoClient } from "mongodb";
import { BASE_IMG_PATH } from "../adapters/multer.js";
import {
    DDBB_URL,
    DDBB_NAME,
    GAME_COLLECTION,
} from "../adapters/databaseinfo.js";

export const createGame = async(id, gameName, master, maxPlayers, img) => {
    const newGame = {
        gameCode: id,
        gameName,
        master,
        maxPlayers,
        players: [],
        status: "WAITING_FOR_PLAYERS",
        boardImg: `${BASE_IMG_PATH}${img}`,
    };

    const client = await MongoClient.connect(DDBB_URL);

    await client.db(DDBB_NAME).collection(GAME_COLLECTION).insertOne(newGame);

    client.close();
};

export const retrieveGameByGameCode = async(gameCode) => {
    const game = {
        gameCode,
    };

    const client = await MongoClient.connect(DDBB_URL);

    const data = await client
        .db(DDBB_NAME)
        .collection(GAME_COLLECTION)
        .findOne(game);

    client.close();

    return data;
};

export const addPlayerToGameById = async(id, game) => {
    const queryGame = {
        gameCode: game.gameCode,
    };

    let newStatus;

    if (game.players.length === game.maxPlayers - 1) {
        newStatus = "FULL";
    } else {
        newStatus = "ACCEPTING_PLAYERS";
    }

    const updatedPlayer = {
        $push: {
            players: { user: id, activeCharacter: "" },
        },
        $set: {
            status: newStatus,
        },
    };

    const client = await MongoClient.connect(DDBB_URL);

    await client
        .db(DDBB_NAME)
        .collection(GAME_COLLECTION)
        .updateOne(queryGame, updatedPlayer);

    client.close();
};

export const addActiveCharacterToGameById = async(
    characterName,
    gameCode,
    id
) => {
    const queryGame = {
        gameCode,
        "players.user": id,
    };

    const updatedActivePlayer = {
        $set: {
            "players.$.activeCharacter": characterName,
        },
    };

    const client = await MongoClient.connect(DDBB_URL);

    await client
        .db(DDBB_NAME)
        .collection(GAME_COLLECTION)
        .updateOne(queryGame, updatedActivePlayer);

    client.close();
};

export const updateActivePlayerStampPositionInGameById = async(
    position,
    gameCode,
    id
) => {
    const queryGame = {
        gameCode,
        "players.user": id,
    };

    const updatedPosition = {
        $set: {
            "players.$.position": position,
        },
    };

    const client = await MongoClient.connect(DDBB_URL);

    await client
        .db(DDBB_NAME)
        .collection(GAME_COLLECTION)
        .updateOne(queryGame, updatedPosition);

    client.close();
};