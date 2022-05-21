import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../utils/mongodb";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	let { db } = await connectToDatabase();
	const { id } = req.query;

	const todos = await db.collection("todos").findOneAndDelete({ id })
	res.status(200).send({ todos });
	// return res.status(200);
}