import dayjs from "dayjs";
import { db } from "../database/db.js";


export async function createPoll(req, res, next) {
    const { title, expireAt } = req.body;

    if (!title) return res.status(422).send("não pode ser uma string vazia")

    try {
        const surveyDate = expireAt || dayjs().add(1, "month").format("YYYY-MM-DD HH:mm")
        await db.collection("polls").insertOne({ title, expireAt: surveyDate})
        res.status(201).send("OK")
    } catch (error) {
        res.status(500).send(error.message);
    }

}

export async function collectPoll(req, res) {
    const surveys = await db.collection("polls").find().toArray();
    res.send(surveys);
}
