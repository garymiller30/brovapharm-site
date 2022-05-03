import type { NextPage } from "next";
import { Button, ButtonGroup, HStack, Text } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { editOrderState } from "../../atoms/editOrderState";

interface NewOrderMenuProps {
  onAdd: () => void;
}

const NewOrderMenu: NextPage<NewOrderMenuProps> = ({ onAdd }) => {
  const [editOrder] = useRecoilState(editOrderState);

  const cntSheets = editOrder.order.sheets.length;
  const cnt = editOrder.order.sheets.reduce((p, c) => p + c.Count, 0);
  return (
    <Flex align="center" h="100%">
      <ButtonGroup>
        <Button
          leftIcon={<AddIcon />}
          onClick={onAdd}
          hidden={editOrder.isReadOnly}
        >
          Додати лист
        </Button>
      </ButtonGroup>
      <Spacer />
      <Text color="white">Листів: </Text>
      <Text fontWeight="bold" marginLeft={2} color="white">
        {cntSheets}
      </Text>
      <Spacer />
      <Text color="white">Тираж:</Text>
      <Text fontWeight="bold" marginLeft={2} color="white">
        {cnt}
      </Text>
    </Flex>
  );
};

export default NewOrderMenu;
