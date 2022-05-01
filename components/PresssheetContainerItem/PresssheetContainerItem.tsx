import { CloseIcon } from "@chakra-ui/icons";
import { Box, Flex, Grid, IconButton, useMediaQuery } from "@chakra-ui/react";
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

  const [isMobile] = useMediaQuery("(max-width: 420px)");

  const onChangeHandle = () => {
    setBack(ps.Back);
  };

  return (
    <Flex
      bg="#bde5ff"
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
      />
    </Flex>
  );
};

export default PresssheetContainerItem;
