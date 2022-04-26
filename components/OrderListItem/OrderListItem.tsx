import { CheckCircleIcon, EditIcon, SunIcon, TimeIcon } from "@chakra-ui/icons";

import {
  Box,
  Flex,
  HStack,
  IconButton,
  Link,
  Spacer,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { NextPage } from "next";
import NextLink from "next/link";
import { useRecoilState } from "recoil";
import { editOrderState } from "../../atoms/editOrderState";
import Order from "../../models/order";
import { ORDER_STATUS } from "../../var/orderStatusEnum";

interface OrderListItemProps {
  order: Order;
}

const OrderListItem: NextPage<OrderListItemProps> = ({ order }) => {
  const [, setEditOrder] = useRecoilState(editOrderState);
  const date = new Date(order.CreateDate);

  function onEditOrderHandle() {
    setEditOrder(order);
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
        <Flex gap={3} align="center" justify="center">
          <HStack>
            {StatusIcon}
            <Text fontSize="20px">заявка № </Text>
            <Text fontSize="20px" fontWeight="bold">
              {order.Number}
            </Text>
            <Text fontSize="20px">
              ({date.getDate()}.{date.getMonth()}.{date.getFullYear()})
            </Text>
          </HStack>
        </Flex>
        <Spacer />
        <Box>
          <NextLink
            href={{
              pathname: "/order/edit",
            }}
          >
            <Link>
              <Tooltip label="редагувати заявку">
                <IconButton
                  aria-label={"edit"}
                  icon={<EditIcon />}
                  onClick={onEditOrderHandle}
                />
              </Tooltip>
            </Link>
          </NextLink>
        </Box>
      </Flex>
    </Box>
  );
};

export default OrderListItem;
