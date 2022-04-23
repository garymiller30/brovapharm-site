import type { NextPage } from "next";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/react";

interface NewOrderMenuProps {
  onAdd: () => void;
}

const NewOrderMenu: NextPage<NewOrderMenuProps> = ({ onAdd }) => {
  return (
    <Flex align="center" h="100%">
      <Box>
        <ButtonGroup>
          <Button leftIcon={<AddIcon />} onClick={onAdd}>
            Додати лист
          </Button>
        </ButtonGroup>
      </Box>
    </Flex>
  );
};

export default NewOrderMenu;
