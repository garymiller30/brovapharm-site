import Order from "../../../models/order";

export async function clientAddOrder(order: Order) {
    const response = await fetch("/api/order", {
        method: "POST",
        body: JSON.stringify(order),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => undefined);
        throw new Error(error?.message || "Не вдалося створити замовлення");
    }
}
