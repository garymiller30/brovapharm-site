import { ObjectId } from "mongodb";
import Order from "../../models/order";
import connectToDatabase from "../connectToDatabase";

export default async function updateOrder(order: Order) {
    try {
        const collection = await connectToDatabase();
        const query = { _id: new ObjectId(order.id) }
        return await collection.updateOne(query, {
            $set: {
                Number: order.Number,
                Status: order.Status,
                sheets: order.sheets,
            }
        }, { upsert: true });
    } catch (err: unknown) {

        throw new Error((err as Error).message);
    }
}