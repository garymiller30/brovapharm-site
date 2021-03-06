import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Container,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { orderListFilterState } from "../../atoms/orderListFilterState";
import { orderListState } from "../../atoms/orderListState";
import AddOrderButton from "../../components/AddOrderButton/AddOrderButton";
import OrderList from "../../components/OrderList/OrderList";

import connectToDatabase from "../../lib/connectToDatabase";
import Order from "../../models/order";
import { filteredOrderListState } from "../../selectors/filteredOrderListState";
import { ORDERLIST_FILTER_ENUM } from "../../var/ORDERLIST_FILTER_ENUM";

interface OrdersProps {
  orders: Order[];
}

const Orders: NextPage<OrdersProps> = ({ orders }) => {
  const [, setOrderList] = useRecoilState(orderListState);
  const [filter, setFilter] = useRecoilState(orderListFilterState);
  const list = useRecoilValue(filteredOrderListState);

  useEffect(() => {
    setOrderList(orders);
  }, []);

  return (
    <Container maxW={600} position="relative" h="100vh">
      <Center m="0 0 5px 0">
        <Text fontSize="4xl">заявки</Text>
      </Center>
      <ButtonGroup
        display="flex"
        w="100%"
        justifyContent="center"
        marginBottom={2}
      >
        <Button
          onClick={() => setFilter(ORDERLIST_FILTER_ENUM.ALL)}
          colorScheme={
            filter === ORDERLIST_FILTER_ENUM.ALL ? "facebook" : "gray"
          }
        >
          Всі
        </Button>
        <Button
          onClick={() => setFilter(ORDERLIST_FILTER_ENUM.COMPLETED)}
          colorScheme={
            filter === ORDERLIST_FILTER_ENUM.COMPLETED ? "facebook" : "gray"
          }
        >
          Виконані
        </Button>
        <Button
          onClick={() => setFilter(ORDERLIST_FILTER_ENUM.UNCOMPLETED)}
          colorScheme={
            filter === ORDERLIST_FILTER_ENUM.UNCOMPLETED ? "facebook" : "gray"
          }
        >
          В роботі
        </Button>
      </ButtonGroup>

      <OrderList orders={list} />
      <AddOrderButton />
    </Container>
  );
};

export default Orders;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const protocol = context.req.headers["x-forwarded-proto"] || "http";
  // const baseUrl = context.req
  //   ? `${protocol}://${context.req.headers.host}`
  //   : "";

  // const res = await fetch(`${baseUrl}/api/order`);
  // const orders = await res.json();
  const collection = await connectToDatabase();
  const orders = await collection.find().toArray();

  return {
    props: {
      // orders,
      orders: orders.map((o) =>
        JSON.parse(JSON.stringify({ ...o, id: o._id }))
      ),
    },
  };
};
