import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { choiceSchema } from "../schemas/choiceSchema.js";
import {  choiceIdVote, choicePoll } from "../controllers/choice.js";


const choiceRouter = Router()

choiceRouter.post("/choice", choicePoll)
choiceRouter.post("/choice/:id/vote", choiceIdVote)

export default choiceRouter