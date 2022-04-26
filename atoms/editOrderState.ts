import { atom } from "recoil";
import Order from "../models/order";


export const editOrderState = atom<Order | null>({
    key: "editOrderState",
    default: null
})