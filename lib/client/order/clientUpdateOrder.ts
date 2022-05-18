import Order from "../../../models/order";

export async function clientUpdateOrder(order: Order) {

    console.log(order);

    await fetch("/api/order", {
        method: "PUT",
        body: JSON.stringify(order),
    });
}