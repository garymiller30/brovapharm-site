import type { NextPage } from "next";
import {
  Box,
  HStack,
  Text,
  useBreakpointValue,
  useMediaQuery,
} from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { editOrderState } from "../../atoms/editOrderState";

interface NewOrderNumberHeaderProps {
  number: number;
  onChange: (num: number) => void;
  onCreate: () => void;
}

const NewOrderNumberHeader: NextPage<NewOrderNumberHeaderProps> = ({
  number,
  onChange,
  onCreate,
}) => {
  const [editOrder] = useRecoilState(editOrderState);
  const [isMobile] = useMediaQuery("(max-width: 420px)");

  const onChangeHandle = (event: any) => {
    onChange(Number(event.target.value));
  };

  const onCreateHandle = () => {
    onCreate();
  };

  const fontSize = { base: "14px", md: "20px", lg: "20px" };

  return (
    <Flex align="center" h="100%">
      <Box>
        <Heading as="h3" fontSize={fontSize} color="white" hidden={isMobile}>
          Бровафарма
        </Heading>
      </Box>
      <Spacer />
      <HStack>
        <Text color="white" fontSize={fontSize}>
          Заявка №{" "}
        </Text>
        {editOrder.isReadOnly ? (
          <Text fontSize={fontSize} fontWeight="bold" color="yellow">
            {number}
          </Text>
        ) : (
          <Input
            w={[50, 70]}
            size="sm"
            color="white"
            fontSize={fontSize}
            fontWeight="bold"
            textAlign="center"
            value={number}
            onChange={onChangeHandle}
            isReadOnly={editOrder.isReadOnly}
          />
        )}
      </HStack>
      <Spacer />

      <Button
        bg="#e9a31e"
        color="#044786"
        onClick={onCreateHandle}
        hidden={editOrder.isReadOnly}
      >
        {editOrder.isNew ? "Створити" : "Зберегти"}
      </Button>
    </Flex>
  );
};

export default NewOrderNumberHeader;
