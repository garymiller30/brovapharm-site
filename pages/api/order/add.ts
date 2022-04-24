// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import addOrder from '../../../lib/order/addOrder';
import Order from '../../../models/order';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case "POST":
            await addOrderApi(req, res);
            return;

    }
    res.status(500)
}


async function addOrderApi(req: NextApiRequest, res: NextApiResponse) {
    const order: Order = JSON.parse(req.body);
    const ret = await addOrder(order);
    return res.status(201).json({ ...order, _id: ret.insertedId });
}