import {
  Box,
  Center,
  GridItem,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { editOrderState } from "../../atoms/editOrderState";
import PS from "../../models/ps";
import PsItem from "../../models/psItem";

interface PressSheetItemProps {
  disabled?: any;
  page: PsItem;
}

const PressSheetItem: NextPage<PressSheetItemProps> = ({ disabled, page }) => {
  const [val, setVal] = useState<number | undefined>(page.Number);
  const [editOrder] = useRecoilState(editOrderState);
  const onChangeHandle = (v: string) => {
    const num = v ? Number(v) : undefined;

    page.Number = num;
    setVal(num);
  };

  return (
    <GridItem w="100%" h="100%" border="1px solid gray" bg={"#82ccfc"}>
      <Center w="100%" h="100%">
        {editOrder.isReadOnly ? (
          disabled ? null : (
            <Text fontSize="20px">{val}</Text>
          )
        ) : (
          <NumberInput
            w="70%"
            min={1}
            value={val}
            onChange={onChangeHandle}
            isDisabled={disabled}
          >
            <NumberInputField id="amount" fontWeight="bold" color="#044786" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        )}
      </Center>
    </GridItem>
  );
};

export default PressSheetItem;
