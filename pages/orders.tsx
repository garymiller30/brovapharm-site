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
import OrderList from "../components/OrderList/OrderList";

import connectToDatabase from "../lib/connectToDatabase";
import Order from "../models/order";

interface OrdersProps {
  orders: Order[];
}

const Orders: NextPage<OrdersProps> = ({ orders }) => {
  return (
    <Container maxW={600}>
      {/* <VStack gap={3}> */}
      <Center m="0 0 20px 0">
        <Text fontSize="4xl">заявки</Text>
      </Center>

      <OrderList orders={orders} />
      {/* </VStack> */}
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
