import { ObjectId } from "mongodb";
import Order from "../../models/order";
import connectToDatabase from "../connectToDatabase";

export async function deleteOrder(order: Order) {
    try {
        const collection = await connectToDatabase();
        const filter = { _id: new ObjectId(order.id) }
        await collection.deleteOne(filter);
    } catch (error: unknown) {
        throw new Error((error as Error).message);
    }
}