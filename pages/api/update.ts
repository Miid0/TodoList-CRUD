import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../utils/mongodb";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	let { db } = await connectToDatabase();
	const { content, id } = req.query;
	try {
		const todos = await db.collection("todos").updateOne({ _id: new ObjectId(id as string) },{$set:{"content":content}})
	} catch (error) {
		console.log(error)
	}
	res.status(200).send({});
	// return res.status(200);
}