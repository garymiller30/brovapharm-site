import { ObjectId } from "mongodb";
import connectToDatabase from "../connectToDatabase";
export default async function getOrderByYearAndNumber(year: number, num: number) {
    try {
        const collection = await connectToDatabase();
        const filter = { Number: num, CreateDate: { $regex: `^${year}` } }
        const order = await collection.findOne(filter);
        if (order)
            return JSON.parse(JSON.stringify({ ...order, id: order?._id }));
        else
            return null;
    }
    catch (err: unknown) {
        throw new Error((err as Error).message)
    }
}