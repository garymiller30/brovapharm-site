import Order from "../../../models/order";

export async function clientUpdateOrder(order: Order) {

    const response = await fetch("/api/order", {
        method: "PUT",
        body: JSON.stringify(order),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => undefined);
        throw new Error(error?.message || "Не вдалося зберегти замовлення");
    }
}
