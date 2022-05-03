import {
  Box,
  Center,
  Heading,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Radio,
  RadioGroup,
  Text,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { editOrderState } from "../../atoms/editOrderState";

import PS from "../../models/ps";
import { PAGE_BACK } from "../../var/pageBackEnum";

interface PresssheetContainerItemParamProps {
  ps: PS;
  onChange: () => void;
}

const PresssheetContainerItemParam: NextPage<
  PresssheetContainerItemParamProps
> = ({ ps, onChange }) => {
  const [back, setBack] = useState<string>(ps.Back.toString());
  const [count, setCount] = useState<number>(ps.Count);
  const [editOrder] = useRecoilState(editOrderState);

  const onChangeHandle = (val: string) => {
    ps.Back = val === "true" ? true : false;

    setBack(val);
    onChange();
  };

  const onChangeCountHandle = (val: string) => {
    ps.Count = Number(val);
    setCount(ps.Count);
  };

  return (
    <Box flex="1" h="100%" p={2}>
      <Heading as="h4" size="md" marginBottom={2}>
        <Text as="u"> Лист {ps.Number}</Text>
      </Heading>

      <HStack gap={4} marginBottom={2}>
        <Text>Зворот: </Text>
        {editOrder.isReadOnly ? (
          <Text fontWeight="bold">
            {back === "true" ? PAGE_BACK.DOUBLE_SIDE : PAGE_BACK.WORK_AND_TURN}
          </Text>
        ) : (
          <RadioGroup onChange={onChangeHandle} value={back}>
            <HStack>
              <Radio value={"true"}>{PAGE_BACK.DOUBLE_SIDE}</Radio>
              <Radio value={"false"}>{PAGE_BACK.WORK_AND_TURN}</Radio>
            </HStack>
          </RadioGroup>
        )}
      </HStack>

      <HStack>
        <Text>Тираж:</Text>
        {editOrder.isReadOnly ? (
          <Text fontWeight="bold">{count}</Text>
        ) : (
          <NumberInput
            w="100px"
            min={1}
            value={count}
            onChange={onChangeCountHandle}
            isDisabled={editOrder.isReadOnly}
          >
            <NumberInputField id="amount" fontWeight="bold" fontSize="lg" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        )}
      </HStack>
    </Box>
  );
};

export default PresssheetContainerItemParam;
