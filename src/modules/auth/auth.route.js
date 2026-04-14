import { Router } from "express";
import validate from "../../common/middleware/validate.middleware.js";
import RegisterDto from "./dto/register.dto.js";
import * as controller from "./auth.controller.js"
import LoginDto from "./dto/login.dto.js";
import authenticationMiddleware from "./auth.middleware.js";

const appRouter = Router();

appRouter.get("/seats", controller.seats);
appRouter.post("/register", validate(RegisterDto), controller.register);
appRouter.post("/login", validate(LoginDto), controller.login);

appRouter.put("/:id/:name", authenticationMiddleware, controller.seatBooked);

export default appRouter;
