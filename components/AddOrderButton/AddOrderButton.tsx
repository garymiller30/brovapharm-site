import { IconButton, Tooltip } from "@chakra-ui/react";
import { NextPage } from "next";
import { AddIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { editOrderState } from "../../atoms/editOrderState";
import Order from "../../models/order";

const AddOrderButton: NextPage = () => {
  const router = useRouter();
  const [, setEditOrder] = useRecoilState(editOrderState);

  function onCreateOrderHandle() {
    setEditOrder({ order: new Order(), isNew: true, isReadOnly: false });
    router.push("/order/new");
  }
  return (
    <Tooltip label="Додати заявку">
      <IconButton
        aria-label="Add Order"
        icon={<AddIcon />}
        position="absolute"
        bottom={5}
        right={5}
        isRound={true}
        size="lg"
        colorScheme={"blue"}
        onClick={onCreateOrderHandle}
      />
    </Tooltip>
  );
};

export default AddOrderButton;
