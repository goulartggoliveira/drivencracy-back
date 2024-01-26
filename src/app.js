import cors from "cors";
import express from "express";
import pollRouter from "./routes/pollRouter.js";
import choiceRouter from "./routes/choiceRouter.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(pollRouter)
app.use(choiceRouter);

const PORT = 5000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))