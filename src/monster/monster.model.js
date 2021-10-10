import { MongoClient } from "mongodb";
import {
  MONSTERS_COLLECTION,
  DDBB_NAME,
  DDBB_URL,
} from "../adapters/databaseinfo.js";

export const retrieveAllMonsters = async () => {
  const client = await MongoClient.connect(DDBB_URL);

  const data = await client
    .db(DDBB_NAME)
    .collection(MONSTERS_COLLECTION)
    .find()
    .toArray();

  client.close();

  return data;
};
