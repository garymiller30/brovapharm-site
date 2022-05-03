import { atom } from "recoil";
import Order from "../models/order";

interface editOrderStateProps {
    order?: Order,
    isNew?: boolean,
    isReadOnly?: boolean
}

export const editOrderState = atom<editOrderStateProps>({
    key: "editOrderState",
    default: { order: undefined }
})