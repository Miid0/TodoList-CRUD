import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../utils/mongodb";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	let { db } = await connectToDatabase();

	const todos = await db.collection("todos").find().toArray();
	res.status(200).json({ todos });
}