import { atom } from "recoil";

export const orderListFilterState = atom({
    key: "OrderListFilter",
    default: "Show Uncompleted"
})