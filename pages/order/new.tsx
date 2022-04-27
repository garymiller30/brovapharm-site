import type { NextPage } from "next";

import OrderComponent from "../../components/OrderComponent/OrderComponent";
import { useRecoilState } from "recoil";
import { editOrderState } from "../../atoms/editOrderState";
import Order from "../../models/order";

const NewOrder: NextPage = () => {
  return <OrderComponent />;
};

export default NewOrder;
