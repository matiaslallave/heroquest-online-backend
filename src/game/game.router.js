import express from "express";
import { createGameController, joinGameController } from "./game.controller.js";
import { validateJWTAuth } from "../auth/auth.middleware.js";
import { uploadMiddleware } from "../adapters/multer.js";
import {
    getGameSessionController,
    updateActivePlayerController,
    refreshActivePlayerStampController,
} from "./game.controller.js";

const router = express.Router();

router.use(validateJWTAuth);

router
    .route("/")
    .post(uploadMiddleware.single("board"), createGameController)
    .patch(joinGameController);

router.route("/:gameCode").get(getGameSessionController);

router.route("/:gameCode/active_char").patch(updateActivePlayerController);

router
    .route("/:gameCode/hero_stamp_position")
    .patch(refreshActivePlayerStampController);

export default router;