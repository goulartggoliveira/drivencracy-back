import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import { db } from "../database/db.js";

export async function choicePoll(req, res) {
    const choice = req.body;

    if(!choice.title || choice.title.trim() === ""){
        return res.status(422).send("Title não pode ser uma string vazia");
        
    }

    try {
        const survey = await db.collection("polls").findOne({ _id: new ObjectId(choice.pollId) });
        if (!survey) return res.status(404).send("Uma opção de voto não pode ser inserida sem uma enquete existente.");

        const existingChoice = await db.collection("choices").findOne({ title: choice.title });
        if (existingChoice) return res.status(409).send("Title não pode ser repetido.");

        if (dayjs(survey.expireAt) < dayjs()) return res.status(403).send("Enquete expirada.");

        const createdChoice = await db.collection("choices").insertOne({ title: choice.title, pollId: new ObjectId(choice.pollId) });

        res.status(201).send(createdChoice);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao criar escolha");
    }
}


