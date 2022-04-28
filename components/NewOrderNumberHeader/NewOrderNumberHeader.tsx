import type { NextPage } from "next";
import { Box, HStack } from "@chakra-ui/react";
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
  const onChangeHandle = (event: any) => {
    onChange(Number(event.target.value));
  };

  const onCreateHandle = () => {
    onCreate();
  };

  return (
    <Flex align="center" h="100%">
      <Box>
        <Heading as="h3" size="md" color="white">
          Бровафарма
        </Heading>
      </Box>
      <Spacer />
      <HStack>
        <Box color="white">Заявка № </Box>
        <Input
          w="70px"
          size="sm"
          color="white"
          fontSize="md"
          fontWeight="bold"
          textAlign="center"
          value={number}
          onChange={onChangeHandle}
          isReadOnly={editOrder.isReadOnly}
        />
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
