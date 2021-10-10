import { MongoClient } from "mongodb";
import { DDBB_URL, DDBB_NAME, USERS_COLLECTION } from "../adapters/databaseinfo.js";

/**
 * Esta función va a buscar los datos a
 * mi sistema de persistencia de datos y devuelve la entidad
 * usuario que corresponda con email y password o undefined si no lo encuentra
 */
export const getUserInfoByIdAndPassword = async (userId, password) => {
  const user = {
    email: userId,
    password: password,
    status: "SUCCESS",
  };

  const client = await MongoClient.connect(DDBB_URL);

  const data = await client.db(DDBB_NAME).collection(USERS_COLLECTION).findOne(user);

  client.close();

  return data;
};

/**
 * Esta función va a buscar los datos a
 * mi sistema de persistencia de datos y devuelve la entidad
 * usuario que corresponda con email o undefined si no lo encuentra
 */
export const getUserInfoById = async (userId) => {
  const user = {
    email: userId,
  };

  const client = await MongoClient.connect(DDBB_URL);

  const data = await client.db(DDBB_NAME).collection(USERS_COLLECTION).findOne(user);

  client.close();

  return data;
};

/**
 * Crea un usuario en donde se guardan los datos. La password ya vendra codificada
 * Tenemos que poner el status para que se sepa que está pending validation
 */
export const registerUser = async (email, password) => {
  const newUser = {
    email: email,
    password: password,
    status: "PENDING_EMAIL_VALIDATION",
    characters: []
  };

  const client = await MongoClient.connect(DDBB_URL);

  await client.db(DDBB_NAME).collection(USERS_COLLECTION).insertOne(newUser);

  client.close();
};

/**
 * Cambia el estado del usuario a SUCCESS
 */
export const updateUserMailVerification = async (email) => {
  const query = {
    email,
  };

  const updatedDoc = {
    $set: {
      status: "SUCCESS",
    },
  };

  const client = await MongoClient.connect(DDBB_URL);

  await client.db(DDBB_NAME).collection(USERS_COLLECTION).updateOne(query, updatedDoc);

  client.close();
};

export const addCharacterToUserByUserId = async (character, userId) => {
  const query = {
    email: userId,
  };

 delete character._id;

  const updatedDoc = {
    $push: {
      characters: character,
    },
  };

  const client = await MongoClient.connect(DDBB_URL);

  await client.db(DDBB_NAME).collection(USERS_COLLECTION).updateOne(query, updatedDoc);

  client.close();
};
