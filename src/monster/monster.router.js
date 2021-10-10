import express from "express";
import { validateJWTAuth } from "../auth/auth.middleware.js";
import { getAllMonstersController } from "./monster.controller.js";

const router = express.Router();

router.use(validateJWTAuth);

router.route("/").get(getAllMonstersController);

export default router;
