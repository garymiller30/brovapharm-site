import * as mongoDB from "mongodb";

export default async function connectToDatabase() {
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.MONGODB_URI as string);
    await client.connect();
    const db: mongoDB.Db = client.db(process.env.MONGODB_DB);
    const orderCollection: mongoDB.Collection = db.collection("order");
    return orderCollection;
}