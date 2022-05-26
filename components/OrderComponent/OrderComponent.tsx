import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Text,
  useToast,
  UseToastOptions,
} from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { editOrderState } from "../../atoms/editOrderState";
import { clientAddOrder } from "../../lib/client/order/clientAddOrder";
import { clientUpdateOrder } from "../../lib/client/order/clientUpdateOrder";
import psCheck from "../../lib/psCheck";
import { useToastHook } from "../../lib/toast";

import Order from "../../models/order";
import PS from "../../models/ps";
import PsItem from "../../models/psItem";
import NewOrderMenu from "../NewOrderMenu/NewOrderMenu";
import NewOrderNumberHeader from "../NewOrderNumberHeader/NewOrderNumberHeader";
import PresssheetContainer from "../PresssheetContainer/PresssheetContainer";

const OrderComponent: NextPage = () => {
  const [editOrder, setEditOrder] = useRecoilState(editOrderState);
  const [psArr, setPsArr] = useState<PS[]>([]);
  const [orderNum, setOrderNum] = useState<number>(0);
  const router = useRouter();
  const [, newToast] = useToastHook();

  useEffect(() => {
    if (editOrder.order) {
      setPsArr(
        editOrder.order.sheets.map((s) => {
          const ns = new PS(s.Number);
          ns.Back = s.Back;
          ns.Count = s.Count;
          ns.Id = s.Id;
          ns.isFinished = s.isFinished;
          ns.pages = s.pages.map((p) => {
            const np = new PsItem(p.Id);
            np.Number = p.Number;
            return np;
          });
          return ns;
        })
      );
      setOrderNum(editOrder.order?.Number);
    }
  }, [editOrder]);

  function onAddHandle() {
    const newArr = [...psArr, new PS(psArr.length + 1)];
    setPsArr(newArr);
    const updateOrder = { ...editOrder };
    if (updateOrder.order && editOrder.order) {
      updateOrder.order = { ...editOrder.order };
      updateOrder.order.sheets = newArr;

      setEditOrder(updateOrder);
    }
  }

  function onDeleteHandle(ps: PS) {
    const newArr = psArr
      .filter((p) => p.Number != ps.Number)
      .map((p, idx) => {
        p.Number = idx + 1;
        return p;
      });

    setPsArr(newArr);

    const updateOrder = { ...editOrder };
    if (updateOrder.order && editOrder.order) {
      updateOrder.order = { ...editOrder.order };
      updateOrder.order.sheets = newArr;

      setEditOrder(updateOrder);
    }
  }

  function onCountChangedHandle(ps: PS) {
    const updateOrder = { ...editOrder };
    if (updateOrder.order && editOrder.order) {
      updateOrder.order = { ...editOrder.order };
      updateOrder.order.sheets = editOrder.order.sheets.map((s) =>
        s.Id === ps.Id ? ps : s
      );
      setEditOrder(updateOrder);
    }
  }

  async function onSwitchFinishedHandle(ps: PS) {
    try {
      if (editOrder.order) {
        const order: Order = {
          ...editOrder.order,
          sheets: editOrder.order.sheets.map((p) => (p.Id === ps.Id ? ps : p)),
        };
        await clientUpdateOrder(order);
        showSuccessToast("оновлено!");
        setPsArr(psArr.map((p) => (p.Id === ps.Id ? ps : p)));
        setEditOrder({ ...editOrder, order });
      }
    } catch (error: unknown) {
      showErrToast((error as Error).message);
    }
  }

  function showErrToast(message: string) {
    newToast({ message, status: "error" });
  }

  function showSuccessToast(message: string) {
    newToast({ message, status: "success" });
  }

  const onCreateHandle = async () => {
    let errors = 0;
    if (orderNum === 0) {
      showErrToast("Вкажи номер замовлення");
      errors++;
    }
    if (psArr.length === 0) {
      showErrToast("потрібно додати лист");
      errors++;
    }
    if (psArr.some((p) => !psCheck(p))) {
      showErrToast("Не на всіх сторінках вказані номери!");
      errors++;
    }
    if (psArr.some((p) => p.Count === 0)) {
      showErrToast("Потрібно вказати тираж");
      errors++;
    }
    if (!errors) {
      await createOrder();
      router.push("/orders");
    }
  };

  async function createOrder() {
    if (editOrder.isNew) {
      try {
        const order: Order = new Order(orderNum, psArr);
        await clientAddOrder(order);

        showSuccessToast("Замовлення створено!");
      } catch (error: unknown) {
        showErrToast((error as Error).message);
      }
    } else {
      if (editOrder.order) {
        const order: Order = {
          ...editOrder.order,
          Number: orderNum,
          sheets: [...psArr],
        };
        try {
          await clientUpdateOrder(order);
          showSuccessToast("Замовлення збережено!");
        } catch (error: unknown) {
          showErrToast((error as Error).message);
        }
      }
    }
  }

  return (
    <>
      <Head>
        <title>Бровафарма | Заявка</title>
        <meta
          name="description"
          content="Бровафарма, заявка, друк, лист, тираж"
        ></meta>
      </Head>

      <Container maxW={{ base: 440, md: 600, lg: 1000 }} h="100vh">
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
            <PresssheetContainer
              psArr={psArr}
              onDelete={onDeleteHandle}
              onSwitchFinished={onSwitchFinishedHandle}
              onCountChanged={onCountChangedHandle}
            />
          </GridItem>
        </Grid>
      </Container>
    </>
  );
};

export default OrderComponent;
