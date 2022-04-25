import { Container, HStack, VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import { GetServerSideProps } from "next";
import { createContext, useEffect, useState } from "react";
import OrderList from "../components/OrderList/OrderList";
import {
  OrderContext,
  OrderContextData,
  OrderContextDataDefaultValue,
  OrderContextProvider,
  OrdersProps,
} from "../context/orderContext";
import connectToDatabase from "../lib/connectToDatabase";
import Order from "../models/order";

const Orders: NextPage<OrdersProps> = ({ orders }) => {
  const [ordersArr, setOrdersArr] = useState<Order[]>(orders);

  return (
    <Container maxW={600}>
      <OrderList orders={orders} />
    </Container>
  );
};

export default Orders;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const collection = await connectToDatabase();
  const orders = await collection.find().toArray();

  return {
    props: {
      orders: orders.map((o) =>
        JSON.parse(JSON.stringify({ ...o, id: o._id }))
      ),
    }, // will be passed to the page component as props
  };
};
