import { selector } from "recoil";
import { orderListFilterState } from "../atoms/orderListFilterState";
import { orderListState } from "../atoms/orderListState";

export const filteredOrderListState = selector({
    key: "FilteredOrderList",
    get: ({ get }) => {
        const filter = get(orderListFilterState);
        const list = get(orderListState);

        switch (filter) {
            case "Show Uncompleted":
                return list.filter(order => order.sheets.some(ps => !ps.isFinished))

            case "Show Completed":
                return list.filter(order => order.sheets.every(ps => ps.isFinished));
            default:
                return list;
        }
    }
})