import type { NextPage } from "next";
import { VStack, Box, StackDivider, Flex, Grid } from "@chakra-ui/react";
import PS from "../../models/ps";
import PresssheetContainerItem from "../PresssheetContainerItem/PresssheetContainerItem";
import { useState } from "react";

interface PresssheetContainerProps {
  psArr: PS[];
  onDelete: (ps: PS) => void;
  onSwitchFinished: (ps: PS) => void;
}

const PresssheetContainer: NextPage<PresssheetContainerProps> = ({
  psArr = [],
  onDelete,
  onSwitchFinished,
}) => {
  return (
    <Flex w="100%" wrap="wrap" gap={3} justify="center">
      {psArr.map((p) => (
        <PresssheetContainerItem
          key={p.Id.toString()}
          ps={p}
          onDelete={onDelete}
          onSwitchFinished={onSwitchFinished}
        />
      ))}
    </Flex>
  );
};

export default PresssheetContainer;
