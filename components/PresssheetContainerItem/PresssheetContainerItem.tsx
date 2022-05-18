import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Grid,
  IconButton,
  useBreakpointValue,
  useMediaQuery,
  Switch,
  Tooltip,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { ChangeEvent, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { editOrderState } from "../../atoms/editOrderState";
import { clientUpdateOrder } from "../../lib/client/order/clientUpdateOrder";
import { useToastHook } from "../../lib/toast";
import Order from "../../models/order";
import PS from "../../models/ps";
import PressSheet from "../PressSheet/PressSheet";
import PresssheetContainerItemParam from "../PresssheetContainerItemParam/PresssheetContainerItemParam";

interface PressSheetContainerItemProps {
  ps: PS;
  onDelete: (ps: PS) => void;
  onSwitchFinished: (ps: PS) => void;
}

const PresssheetContainerItem: NextPage<PressSheetContainerItemProps> = ({
  ps,
  onDelete,
  onSwitchFinished,
}) => {
  const [back, setBack] = useState<boolean>(ps.Back);
  const [editOrder] = useRecoilState(editOrderState);

  const [, newToast] = useToastHook();

  //const [isMobile] = useMediaQuery("(max-width: 420px)");
  //const buttonSize = useBreakpointValue(["xs", "xs"]);
  const onChangeHandle = () => {
    setBack(ps.Back);
  };

  const onSwitchHandle = async (event: ChangeEvent<HTMLInputElement>) => {
    const newPs = { ...ps, isFinished: event.target.checked };
    onSwitchFinished(newPs);
  };

  return (
    <Flex
      _focus={{ backgroundColor: "yellow" }}
      _hover={{ backgroundColor: "yellow" }}
      bg={ps.isFinished ? "lightgreen" : "#bde5ff"}
      position="relative"
      top={0}
      left={0}
      p={2}
      borderRadius={5}
      align="center"
      direction={{ base: "column-reverse", md: "row" }}
    >
      <PressSheet key={ps.Id.toString()} ps={ps} />
      <PresssheetContainerItemParam ps={ps} onChange={onChangeHandle} />
      <IconButton
        aria-label="delete"
        icon={<CloseIcon />}
        position="absolute"
        right={2}
        top={2}
        onClick={() => onDelete(ps)}
        hidden={editOrder.isReadOnly}
        size={"xs"}
      />

      <Switch
        onChange={onSwitchHandle}
        defaultChecked={ps.isFinished}
        checked={ps.isFinished}
        hidden={!editOrder.isReadOnly}
        position="absolute"
        right={2}
        top={2}
      />
    </Flex>
  );
};

export default PresssheetContainerItem;
