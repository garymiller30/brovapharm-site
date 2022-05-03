import { Box, Button, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { editOrderState } from "../../atoms/editOrderState";
import OrderComponent from "../../components/OrderComponent/OrderComponent";

const Edit: NextPage = () => {
  const [editOrder] = useRecoilState(editOrderState);
  const router = useRouter();
  if (!editOrder.order) {
    return (
      <Box>
        <Text>Нема що правити</Text>
        <Button onClick={() => router.back()}>Назад</Button>
      </Box>
    );
  }

  return <OrderComponent />;
};

export default Edit;
