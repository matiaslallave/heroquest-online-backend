import {
  retrievePresetCharacterByName,
  retrieveAllPresetCharacters,
} from "./character.model.js";

export const getPresetCharactersController = async (req, res) => {
    const characters = await retrieveAllPresetCharacters();
    res.send(characters);
  } 

export const getPresetCharacterByNameController = async (req, res) => {
  if (req.params.name !== undefined) {
    const character = await retrievePresetCharacterByName(req.params.name);
    res.status(200).send(character);
  } else {
    res.status(404).send("error");
  } 
}
