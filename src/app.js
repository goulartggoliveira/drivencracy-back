import cors from "cors";
import express from "express";
import pollRouter from "./routes/pollRouter.js";
import choiceRouter from "./routes/choiceRouter.js";
import dotenv from "dotenv"

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config()

app.use(pollRouter)
app.use(choiceRouter);


const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`)
})