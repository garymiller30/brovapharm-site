import { CloseIcon } from "@chakra-ui/icons";
import { Box, Flex, Grid, IconButton } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { editOrderState } from "../../atoms/editOrderState";
import PS from "../../models/ps";
import PressSheet from "../PressSheet/PressSheet";
import PresssheetContainerItemParam from "../PresssheetContainerItemParam/PresssheetContainerItemParam";

interface PressSheetContainerItemProps {
  ps: PS;
  onDelete: (ps: PS) => void;
}

const PresssheetContainerItem: NextPage<PressSheetContainerItemProps> = ({
  ps,
  onDelete,
}) => {
  const [back, setBack] = useState<boolean>(ps.Back);
  const [editOrder] = useRecoilState(editOrderState);
  const onChangeHandle = () => {
    setBack(ps.Back);
  };

  return (
    <Flex
      h="150px"
      w="100%"
      bg="#bde5ff"
      position="relative"
      top={0}
      left={0}
      p={2}
      borderRadius={5}
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
      />
    </Flex>
  );
};

export default PresssheetContainerItem;
