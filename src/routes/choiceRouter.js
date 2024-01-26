import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { choiceSchema } from "../schemas/choiceSchema.js";
import { choicePoll } from "../controllers/choice.js";


const choiceRouter = Router()

choiceRouter.post("/choice", choicePoll)
choiceRouter.post("/choice/:id/vote",)

export default choiceRouter