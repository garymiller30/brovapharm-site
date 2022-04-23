import type { NextPage } from "next";
import { VStack, Box, StackDivider, Flex, Grid } from "@chakra-ui/react";
import PS from "../../models/ps";
import PresssheetContainerItem from "../PresssheetContainerItem/PresssheetContainerItem";
import { useState } from "react";

interface PresssheetContainerProps {
  psArr: PS[];
  onDelete: (ps: PS) => void;
}

const PresssheetContainer: NextPage<PresssheetContainerProps> = ({
  psArr = [],
  onDelete,
}) => {
  return (
    <VStack divider={<StackDivider borderColor="gray.200" />}>
      {psArr.map((p) => (
        <PresssheetContainerItem
          key={p.Id.toString()}
          ps={p}
          onDelete={onDelete}
        />
      ))}
    </VStack>
  );
};

export default PresssheetContainer;
