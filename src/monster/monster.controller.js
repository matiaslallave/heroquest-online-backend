import { retrieveAllMonsters } from "./monster.model.js";

export const getAllMonstersController = async (req, res) => {
  const monstersData = await retrieveAllMonsters();
  res.status(200).send(monstersData);
};
