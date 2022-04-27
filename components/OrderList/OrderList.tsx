import { VStack } from "@chakra-ui/react";
import { NextPage } from "next";

import Order from "../../models/order";
import OrderListItem from "../OrderListItem/OrderListItem";

interface OrderListProps {
  orders: Order[];
}

const OrderList: NextPage<OrderListProps> = ({ orders }) => {
  return (
    <VStack>
      {orders.map((o) => (
        <OrderListItem key={o.id?.toString()} order={o} />
      ))}
    </VStack>
  );
};

export default OrderList;
