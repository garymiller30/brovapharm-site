import {
  CheckCircleIcon,
  DeleteIcon,
  EditIcon,
  SunIcon,
  TimeIcon,
} from "@chakra-ui/icons";

import {
  Box,
  Flex,
  HStack,
  IconButton,
  Spacer,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { editOrderState } from "../../atoms/editOrderState";
import { useToastHook } from "../../lib/toast";
import Order from "../../models/order";
import { ORDER_STATUS } from "../../var/orderStatusEnum";

interface OrderListItemProps {
  order: Order;
}

const OrderListItem: NextPage<OrderListItemProps> = ({ order }) => {
  const [, setEditOrder] = useRecoilState(editOrderState);
  const [, newToast] = useToastHook();
  const router = useRouter();
  const date = new Date(order.CreateDate);

  function onEditOrderHandle() {
    setEditOrder({ order: order, isNew: false, isReadOnly: false });
    router.push("/order/edit");
  }
  function onViewClickHandle() {
    setEditOrder({ order: order, isNew: false, isReadOnly: true });
    router.push("/order/view");
  }

  function showSuccessToast(message: string) {
    newToast({ message, status: "success" });
  }
  function showErrToast(message: string) {
    newToast({ message, status: "error" });
  }

  async function onDeleteClickHandle(order: Order) {
    try {
      await fetch("/api/order", {
        method: "DELETE",
        body: JSON.stringify(order),
      });

      showSuccessToast("заявка видалена");

      router.push("/orders");
    } catch (err: unknown) {
      showErrToast((err as Error).message);
    }
  }

  let StatusIcon;
  switch (order.Status) {
    case ORDER_STATUS.NEW:
      StatusIcon = <SunIcon color="yellow" />;
      break;
    case ORDER_STATUS.INPROGRESS:
      StatusIcon = <TimeIcon />;
      break;
    case ORDER_STATUS.DONE:
      StatusIcon = <CheckCircleIcon />;
      break;
  }

  return (
    <Box w="100%" bg="#82ccfc" borderWidth="1px" borderRadius="lg" p={2}>
      <Flex>
        <Flex
          gap={3}
          align="center"
          justify="center"
          onClick={onViewClickHandle}
          cursor="pointer"
        >
          <HStack>
            {/* {StatusIcon} */}
            <Text fontSize={{ base: "16px", md: "18px", lg: "20px" }}>
              заявка №{" "}
            </Text>
            <Text
              fontSize={{ base: "16px", md: "18px", lg: "20px" }}
              fontWeight="bold"
            >
              {order.Number}
            </Text>
            <Text fontSize={{ base: "16px", md: "18px", lg: "20px" }}>
              ({date.getDate()}.{date.getMonth()}.{date.getFullYear()})
            </Text>
          </HStack>
        </Flex>

        <Spacer />
        <Box>
          <Tooltip label="редагувати заявку">
            <IconButton
              m="0 6px"
              aria-label={"edit"}
              icon={<EditIcon />}
              onClick={onEditOrderHandle}
            />
          </Tooltip>
          <Tooltip label="видалити заявку">
            <IconButton
              aria-label={"delete"}
              icon={<DeleteIcon />}
              onClick={() => onDeleteClickHandle(order)}
            />
          </Tooltip>
        </Box>
      </Flex>
    </Box>
  );
};

export default OrderListItem;
