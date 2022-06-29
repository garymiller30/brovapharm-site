import type { NextPage } from "next";
import {
  Button,
  ButtonGroup,
  HStack,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cntSheets = editOrder.order?.sheets.length;
  const cnt = editOrder.order?.sheets.reduce((p, c) => p + c.Count, 0);

  interface downloadFileProps {
    data: string;
    fileName: string;
    fileType: string;
  }

  const downloadFile = ({ data, fileName, fileType }: downloadFileProps) => {
    // Create a blob with the data we want to download as a file
    const blob = new Blob([data], { type: fileType });
    // Create an anchor element and dispatch a click event on it
    // to trigger a download
    const a = document.createElement("a");
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };

  const exportToJson = (e: any) => {
    e.preventDefault();
    downloadFile({
      data: JSON.stringify(editOrder.order),
      fileName: "order.json",
      fileType: "text/json",
    });
  };

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
        <Button onClick={exportToJson} hidden={!editOrder.isReadOnly}>
          json
        </Button>
      </ButtonGroup>
      <Spacer />
      <Flex wrap="wrap" marginLeft={2}>
        <HStack margin="0 3px ">
          <Text color="white">Листів: </Text>
          <Text fontWeight="bold" marginLeft={2} color="white">
            {cntSheets}
          </Text>
        </HStack>

        <HStack margin="0 3px ">
          <Button onClick={onOpen}>
            <Text>Тираж:</Text>
            <Text fontWeight="bold" marginLeft={2}>
              {cnt}
            </Text>
          </Button>
        </HStack>
      </Flex>
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>список з тиражами</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <List spacing={1}>
              {editOrder.order?.sheets.map((s) => {
                return (
                  <ListItem key={s.Id.toString()}>
                    <Stack direction="row">
                      <Text>Лист {s.Number}</Text>
                      <Text> - {s.Count}</Text>
                    </Stack>
                  </ListItem>
                );
              })}
            </List>
          </ModalBody>
          {/* <ModalFooter>
            <Button onClick={onClose}>Закрити</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default NewOrderMenu;
