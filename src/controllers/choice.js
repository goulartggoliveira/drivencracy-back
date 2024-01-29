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

export async function choiceIdVote(req, res) {

    const choiceId = req.params.id;

    try {

        const existingChoice = await db.collection("choices").findOne({ _id: new ObjectId(choiceId) });
        if (!existingChoice) {
            return res.status(404).send("Opção de voto não encontrada.");
        }
    

        const survey = await db.collection("polls").findOne({ _id: new ObjectId(existingChoice.pollId) });
        if (!survey) {
            return res.status(404).send("Enquete não encontrada.");
        }

        if (dayjs(survey.expireAt) < dayjs()) {
            return res.status(403).send("A enquete já expirou. Não é possível registrar o voto.");
        }
        
        // Registrar o voto associando a data e hora da criação no back-end
        const voteResult = await db.collection("votes").insertOne({
            choiceId: ObjectId(choiceId),
            createdAt: dayjs().format("YYYY-MM-DD HH:mm"),
        });

        // Retornar uma resposta adequada
        res.status(201).send("Voto registrado com sucesso.");
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao registrar voto.");
    }
}
