import { NextApiRequest, NextApiResponse } from "next";
import getOrderByYearAndNum from '../../../lib/order/getOrderByYearAndNumber'

export default async function handler(req: NextApiRequest,
    res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            return await getOrderByYearAndNumber(req, res);
        default:
            return res.status(404).json({});
    }
}

async function getOrderByYearAndNumber(req: NextApiRequest, res: NextApiResponse) {
    const { year, number } = req.query;
    const order = await getOrderByYearAndNum(+year, +number);
    if (order) {
        return res.status(200).json(order);
    }
    return res.status(404).json({})

}