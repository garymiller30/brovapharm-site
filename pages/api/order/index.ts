// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import addOrder from '../../../lib/order/addOrder';
import { deleteOrder } from '../../../lib/order/deleteOrder';
import getOrderById from '../../../lib/order/getOrderById';
import getOrders from '../../../lib/order/getOrders';
import updateOrder from '../../../lib/order/updateOrder';
import Order from '../../../models/order';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case "GET":
            return await getOrderApi(req, res);
        case "POST":
            return await addOrderApi(req, res);

        case "PUT":
            return await updateOrderApi(req, res);
        case "DELETE":
            return await deleteOrderApi(req, res);

    }
    res.status(500)
}

async function getOrderApi(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query.id as string;
    if (id) {
        const order = await getOrderById(id) as Order;
        return res.status(200).json(JSON.parse(JSON.stringify({ ...order })));
    }
    else {
        const orders = await getOrders()
        return res.status(200).json(orders);
    }
}

async function addOrderApi(req: NextApiRequest, res: NextApiResponse) {
    const order: Order = JSON.parse(req.body);
    const ret = await addOrder(order);
    return res.status(201).json({ ...order, _id: ret.insertedId });
}

async function updateOrderApi(req: NextApiRequest, res: NextApiResponse) {
    const order: Order = JSON.parse(req.body);
    await updateOrder(order);

    return res.status(200).json({});
}

async function deleteOrderApi(req: NextApiRequest, res: NextApiResponse) {
    const order: Order = JSON.parse(req.body);
    await deleteOrder(order);
    return res.status(200).json({});
}