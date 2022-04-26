import { Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRecoilState } from "recoil";
import { editOrderState } from "../../atoms/editOrderState";

const Edit: NextPage = () => {
  const [editOrder] = useRecoilState(editOrderState);

  if (!editOrder) return <Text>Нічого редагувати</Text>;

  console.log(editOrder);

  return <>Edit</>;
};

export default Edit;
