import {
  Center,
  Container,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { GetServerSideProps } from "next";
import AddOrderButton from "../components/AddOrderButton/AddOrderButton";
import OrderList from "../components/OrderList/OrderList";

import connectToDatabase from "../lib/connectToDatabase";
import Order from "../models/order";

interface OrdersProps {
  orders: Order[];
}

const Orders: NextPage<OrdersProps> = ({ orders }) => {
  return (
    <Container maxW={600} position="relative" h="100vh">
      <Center m="0 0 20px 0">
        <Text fontSize="4xl">заявки</Text>
      </Center>

      <OrderList orders={orders} />
      <AddOrderButton />
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
    },
  };
};
