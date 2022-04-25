import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { OrderContext, useOrderContext } from "../../context/orderContext";
import Order from "../../models/order";

const Edit: NextPage = () => {
  const [order, setOrder] = useState<Order | null>(null);
  const router = useRouter();
  const ctx = useOrderContext();
  useEffect(() => {
    const { id } = router.query;

    console.log(ctx);
  }, []);

  return <>Edit</>;
};

export default Edit;
