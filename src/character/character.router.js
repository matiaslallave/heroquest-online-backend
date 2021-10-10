import express from "express";
import { getPresetCharactersController, getPresetCharacterByNameController } from "./character.controller.js";


const router = express.Router();

router.route("/preset").get(getPresetCharactersController);

router.route("/preset/:name").get(getPresetCharacterByNameController);

export default router;