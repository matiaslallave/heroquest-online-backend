import { MongoClient } from "mongodb";
import { DDBB_URL, DDBB_NAME, CHAR_PRESET_COLLECTION } from "../adapters/databaseinfo.js";

export const retrievePresetCharacterByName = async (charName) => {
  const presetChar = {
    name: charName,
  };

  const client = await MongoClient.connect(DDBB_URL);

  const data = await client
    .db(DDBB_NAME)
    .collection(CHAR_PRESET_COLLECTION)
    .findOne(presetChar);

  client.close();

  return data;
};

export const retrieveAllPresetCharacters = async () => {
  const client = await MongoClient.connect(DDBB_URL);

  const data = await client
    .db(DDBB_NAME)
    .collection(CHAR_PRESET_COLLECTION)
    .find()
    .toArray();

  client.close();

  return data;
};
