import { NextPage } from "next";
import { createContext, useContext, useEffect, useState } from "react";
import Order from "../models/order";

export interface OrdersProps {
  orders: Order[];
}

export interface OrderContextData {
  orders: Order[];
}

export const OrderContextDataDefaultValue: OrderContextData = { orders: [] };

export const OrderContext = createContext<OrderContextData>(
  OrderContextDataDefaultValue
);

export function useOrderContext() {
  return useContext(OrderContext);
}

interface OrderContextProviderProps {
  orders: Order[];
  children: JSX.Element;
}

export const OrderContextProvider: NextPage<OrderContextProviderProps> = ({
  orders,
  children,
}) => {
  const [ordersArr, setOrdersArr] = useState<OrderContextData>({ orders });
  useEffect(() => {
    setOrdersArr({ orders });
  }, [orders]);

  return (
    <OrderContext.Provider value={ordersArr}>{children}</OrderContext.Provider>
  );
};
