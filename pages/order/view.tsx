import { Box, Center, Text, Spinner } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { editOrderState } from "../../atoms/editOrderState";
import OrderComponent from "../../components/OrderComponent/OrderComponent";

const ViewOrder: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string>("");
  const [editOrder, setEditOrder] = useRecoilState(editOrderState);
  const router = useRouter();
  // Завантажуємо замовлення при завантаженні сторінки або зміні id в URL
  useEffect(() => {
    if (!router.isReady) return;
    const id = router.query.id as string | undefined;

    async function getOrder() {
      if (!id) {
        setLoadError("Не вказано id замовлення");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/order?id=${id}`);
        if (!res.ok) {
          setLoadError("Не вдалося завантажити замовлення");
          setLoading(false);
          return;
        }
        const order = await res.json();

        setEditOrder({ order, isNew: false, isReadOnly: true });
      } catch {
        setLoadError("Не вдалося завантажити замовлення");
      }
      setLoading(false);
    }

    setLoadError("");
    setLoading(true);
    getOrder();
  }, [router.isReady, router.query.id, setEditOrder]);

  const id = router.query.id as string | undefined;
  const isCurrentOrder = editOrder.order?.id?.toString() === id;

  if (loadError)
    return (
      <Box w="100vw" h="100vh">
        <Center h="100%">
          <Text m={5}>{loadError}</Text>
        </Center>
      </Box>
    );

  if (loading || !router.isReady || !editOrder.order || !isCurrentOrder)
    return (
      <Box w="100vw" h="100vh">
        <Center h="100%">
          <Spinner size="md" /> <Text m={5}>Завантажую...</Text>
        </Center>
      </Box>
    );

  return <OrderComponent />;
};

export default ViewOrder;
