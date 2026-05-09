import type { NextPage } from "next";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { editOrderState } from "../../atoms/editOrderState";
import OrderComponent from "../../components/OrderComponent/OrderComponent";
import Order from "../../models/order";

const NewOrder: NextPage = () => {
  const setEditOrder = useSetRecoilState(editOrderState);

  useEffect(() => {
    setEditOrder({ order: new Order(), isNew: true, isReadOnly: false });
  }, [setEditOrder]);

  return <OrderComponent />;
};

export default NewOrder;
