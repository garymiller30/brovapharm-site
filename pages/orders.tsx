import { FindCursor, WithId } from "mongodb";
import { NextPage } from "next";
import { GetServerSideProps } from "next";
import connectToDatabase from "../lib/connectToDatabase";
import Order from "../models/order";

interface OrdersProps {
  orders: Order[];
}

const Orders: NextPage<OrdersProps> = ({ orders }) => {
  return (
    <div>
      {orders.map((o) => (
        <div>{o.Number} </div>
      ))}
    </div>
  );
};

export default Orders;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const collection = await connectToDatabase();
  const orders = await collection.find().toArray();

  return {
    props: { orders: orders.map((o) => ({ ...o, _id: o._id.toString() })) }, // will be passed to the page component as props
  };
};
