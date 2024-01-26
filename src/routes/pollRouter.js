import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { pollSchema } from "../schemas/pollSchema.js";
import { collectPoll, createPoll } from "../controllers/poll.js";


const pollRouter = Router()

pollRouter.post("/poll", validateSchema(pollSchema), createPoll)
pollRouter.get("/poll", collectPoll)
pollRouter.get("/poll/:id/choice",)
pollRouter.get("/poll/:id/result",)


export default pollRouter