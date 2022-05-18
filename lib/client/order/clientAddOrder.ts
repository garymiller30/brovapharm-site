import Order from "../../../models/order";

export async function clientAddOrder(order: Order) {
    await fetch("/api/order", {
        method: "POST",
        body: JSON.stringify(order),
    });
}