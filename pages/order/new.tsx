import type { NextPage } from "next";
import { Container, toast, UseToastOptions } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import NewOrderNumberHeader from "../../components/NewOrderNumberHeader/NewOrderNumberHeader";
import NewOrderMenu from "../../components/NewOrderMenu/NewOrderMenu";
import PresssheetContainer from "../../components/PresssheetContainer/PresssheetContainer";
import { useState } from "react";
import PS from "../../models/ps";
import psCheck from "../../lib/psCheck";
import { useToast } from "@chakra-ui/react";
import Order from "../../models/order";

const toastOptions: UseToastOptions = {
  status: "error",
  duration: 5000,
  isClosable: true,
};

const NewOrder: NextPage = () => {
  const [orderNum, setOrderNum] = useState<number>(0);
  const [psArr, setPsArr] = useState<PS[]>([]);

  const toast = useToast();

  const showErrToast = (description: string) => {
    toast({ ...toastOptions, description });
  };

  const showSuccessToast = (description: string) => {
    toast({ ...toastOptions, description, status: "success" });
  };

  function onAddHandle() {
    setPsArr([...psArr, new PS(psArr.length + 1)]);
  }
  function onDeleteHandle(ps: PS) {
    setPsArr(
      psArr
        .filter((p) => p.Number != ps.Number)
        .map((p, idx) => {
          p.Number = idx + 1;
          return p;
        })
    );
  }

  async function createOrder() {
    try {
      const order: Order = new Order(orderNum, psArr);
      await fetch("/api/order/add", {
        method: "POST",
        body: JSON.stringify(order),
      });
      showSuccessToast("Замовлення створено!");
    } catch (error: unknown) {
      showErrToast((error as Error).message);
    }
  }

  const onCreateHandle = () => {
    if (orderNum === 0) {
      showErrToast("Вкажи номер замовлення");
    }
    if (psArr.length === 0) {
      showErrToast("потрібно додати лист");
    }
    if (psArr.some((p) => !psCheck(p))) {
      showErrToast("Не на всіх сторінках вказані номери!");
    }
    if (psArr.some((p) => p.Count === 0)) {
      showErrToast("Потрібно вказати тираж");
    }

    //TODO:create order
    createOrder();
  };

  return (
    <Container minW={600} maxW={600} h="100vh">
      <Grid templateRows="50px 60px 1fr" h="100%">
        <GridItem bg="#044786" p="0 8px">
          <NewOrderNumberHeader
            number={orderNum}
            onChange={(val) => setOrderNum(val)}
            onCreate={onCreateHandle}
          />
        </GridItem>
        <GridItem p="0 8px" bg="#109dec" borderBottomRadius={5}>
          <NewOrderMenu onAdd={onAddHandle} />
        </GridItem>
        <GridItem p="0 8px" m="8px 0 0 0">
          <PresssheetContainer psArr={psArr} onDelete={onDeleteHandle} />
        </GridItem>
      </Grid>
    </Container>
  );
};

export default NewOrder;
