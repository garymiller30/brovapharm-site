import { Box, Button, Center, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { NextRouter, useRouter, withRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { editOrderState } from "../../atoms/editOrderState";
import OrderComponent from "../../components/OrderComponent/OrderComponent";
import { Spinner } from "@chakra-ui/react";

const ViewOrder: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [editOrder, setEditOrder] = useRecoilState(editOrderState);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    console.log("router.isReady", router.isReady);
  }, []);

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

  if (!loading || !router.isReady || !editOrder.order)
    return (
      <Box w="100vw" h="100vh">
        <Center h="100%">
          <Spinner size="xl" /> <Text m={5}>Завантажую...</Text>
        </Center>
      </Box>
    );

  return <OrderComponent />;
};

export default ViewOrder;
