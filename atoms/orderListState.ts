import { atom } from "recoil"
import Order from "../models/order"



export const orderListState = atom<Order[]>({
    key: "orderListState",
    default: []
})