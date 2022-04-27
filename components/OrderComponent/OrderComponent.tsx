import {
  Container,
  Grid,
  GridItem,
  useToast,
  UseToastOptions,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { editOrderState } from "../../atoms/editOrderState";
import psCheck from "../../lib/psCheck";
import Order from "../../models/order";
import PS from "../../models/ps";
import PsItem from "../../models/psItem";
import NewOrderMenu from "../NewOrderMenu/NewOrderMenu";
import NewOrderNumberHeader from "../NewOrderNumberHeader/NewOrderNumberHeader";
import PresssheetContainer from "../PresssheetContainer/PresssheetContainer";

const toastOptions: UseToastOptions = {
  status: "error",
  duration: 5000,
  isClosable: true,
};
const OrderComponent: NextPage = () => {
  const [editOrder, setEditOrder] = useRecoilState(editOrderState);
  const [psArr, setPsArr] = useState<PS[]>([]);
  const [orderNum, setOrderNum] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    if (editOrder) {
      console.log("OrderComponent", editOrder);
      setPsArr(
        editOrder.order.sheets.map((s) => {
          const ns = new PS(s.Number);
          ns.Back = s.Back;
          ns.Count = s.Count;
          ns.Id = s.Id;
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
        await fetch("/api/order", {
          method: "POST",
          body: JSON.stringify(order),
        });
        showSuccessToast("Замовлення створено!");
      } catch (error: unknown) {
        showErrToast((error as Error).message);
      }
    } else {
      const order: Order = {
        ...editOrder.order,
        Number: orderNum,
        sheets: [...psArr],
      };

      await fetch("/api/order", {
        method: "PUT",
        body: JSON.stringify(order),
      });
    }
  }
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

export default OrderComponent;
