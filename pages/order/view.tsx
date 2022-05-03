import { Box, Button, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { NextRouter, useRouter, withRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { editOrderState } from "../../atoms/editOrderState";
import OrderComponent from "../../components/OrderComponent/OrderComponent";
import Order from "../../models/order";

const ViewOrder: NextPage = () => {
  const [editOrder, setEditOrder] = useRecoilState(editOrderState);
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;

    async function getOrder() {
      const id = router.query.id as string;

      if (id) {
        const res = await fetch(`/api/order?id=${id}`);
        const order = await res.json();

        setEditOrder({ order, isReadOnly: true });
      }
    }

    if (!editOrder.order) {
      getOrder();
    }
  }, [editOrder, router.isReady]);

  if (!editOrder.order) {
    return (
      <Box>
        <Text>Нема що дивитись</Text>
        <Button onClick={() => router.back()}>Назад</Button>
      </Box>
    );
  }
  return <OrderComponent />;
};

export default ViewOrder;
