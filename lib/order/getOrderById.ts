import { ObjectId } from "mongodb";
import Order from "../../models/order";
import connectToDatabase from '../connectToDatabase'

export default async function getOrderById(id: string) {
    try {
        const collection = await connectToDatabase();
        const filter = { _id: new ObjectId(id) }
        const order = await collection.findOne(filter);
        return JSON.parse(JSON.stringify({ ...order, id: order?._id }));
    } catch (err: unknown) { throw new Error((err as Error).message); }
}