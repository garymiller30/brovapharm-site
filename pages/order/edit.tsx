import { Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRecoilState } from "recoil";
import { editOrderState } from "../../atoms/editOrderState";
import OrderComponent from "../../components/OrderComponent/OrderComponent";

const Edit: NextPage = () => {
  return <OrderComponent />;
};

export default Edit;
