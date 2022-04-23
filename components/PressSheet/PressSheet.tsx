import { Box, Grid } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useReducer, useState } from "react";
import PS from "../../models/ps";
import PsItem from "../../models/psItem";
import PressSheetItem from "../PressSheetItem/PressSheetItem";

interface PressSheetProps {
  ps: PS;
}

const PressSheet: NextPage<PressSheetProps> = ({ ps }) => {
  return (
    <Box w="200px" h="100%">
      <Grid
        w="100%"
        h="100%"
        templateColumns="50% 50%"
        templateRows="repeat(3,1fr)"
      >
        {ps.pages.map((page, idx) => {
          if (idx % 2 !== 0 && ps.Back === false) {
            return <PressSheetItem key={idx} page={page} disabled />;
          } else {
            return <PressSheetItem key={idx} page={page} />;
          }
        })}
      </Grid>
    </Box>
  );
};

export default PressSheet;
