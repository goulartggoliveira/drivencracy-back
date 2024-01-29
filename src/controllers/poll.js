import dayjs from "dayjs";
import { db } from "../database/db.js";
import { ObjectId } from "mongodb";



export async function createPoll(req, res, next) {
    const { title, expireAt } = req.body;

    if (!title) return res.status(422).send("não pode ser uma string vazia")

    try {
        const surveyDate = expireAt || dayjs().add(1, "month").format("YYYY-MM-DD HH:mm")

        const survey = {
            title: title,
            expireAt: surveyDate
        }

        await db.collection("polls").insertOne(survey)
        res.status(201).send(survey)
    } catch (error) {
        res.status(500).send(error.message);
    }

}

export async function collectPoll(req, res) {
    const surveys = await db.collection("polls").find().toArray();
    res.send(surveys);
}

export async function choiceIdPoll(req, res) {
    const pollId = req.params.id;
    const pollCollection = db.collection("polls");
    const choiceCollection = db.collection("choices");

    try {
        const survey = await pollCollection.findOne({ _id: new ObjectId(pollId) });

        if (!survey) return res.status(404).send("Enquete não existe");

        const choices = await choiceCollection.find({ pollId: new ObjectId(pollId) }).toArray();
        res.send(choices);
    } catch (err) {
        res.status(500).send(err.message);
    }
}


