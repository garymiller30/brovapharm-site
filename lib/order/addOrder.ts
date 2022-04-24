import Order from "../../models/order";
import connectToDatabase from '../connectToDatabase'

export default async function addOrder(order: Order) {
    try {
        const collection = await connectToDatabase();
        return await collection.insertOne(order);

    } catch (err: unknown) {
        throw new Error((err as Error).message);
    }

}