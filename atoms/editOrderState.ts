import { atom } from "recoil";
import Order from "../models/order";

interface editOrderStateProps {
    order: Order,
    isNew: boolean
}

export const editOrderState = atom<editOrderStateProps>({
    key: "editOrderState",
    default: { order: new Order(), isNew: true }
})