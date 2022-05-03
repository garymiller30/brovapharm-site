import Order from "../../models/order";
import connectToDatabase from '../connectToDatabase'

export default async function getOrders() {
    try {
        const collection = await connectToDatabase();
        const orders = await collection.find().toArray();
        return orders.map((o) =>
            JSON.parse(JSON.stringify({ ...o, id: o._id })));
    } catch (err: unknown) { throw new Error((err as Error).message); }
}