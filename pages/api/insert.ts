import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../utils/mongodb";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	let { db } = await connectToDatabase();
	const { content } = req.query;
	const todo = {
		content,
		inserted: Date.now(),
		updated: 0
	}
	console.log(content);
	const todos = await db.collection("todos").insertOne(todo)
	res.status(200).send({ todos });
	// return res.status(200);
}