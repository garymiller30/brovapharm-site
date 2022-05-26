import { atom } from "recoil";
import { ORDERLIST_FILTER_ENUM } from "../var/ORDERLIST_FILTER_ENUM";

export const orderListFilterState = atom({
    key: "OrderListFilter",
    default: ORDERLIST_FILTER_ENUM.UNCOMPLETED
})