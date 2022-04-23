import type { NextPage } from "next";
import { Container } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import NewOrderNumberHeader from "../../components/NewOrderNumberHeader/NewOrderNumberHeader";
import NewOrderMenu from "../../components/NewOrderMenu/NewOrderMenu";
import PresssheetContainer from "../../components/PresssheetContainer/PresssheetContainer";
import { useState } from "react";
import PS from "../../models/ps";

const NewOrder: NextPage = () => {
  const [orderNum, setOrderNum] = useState<number>(0);
  const [psArr, setPsArr] = useState<PS[]>([]);

  function onAddHandle() {
    setPsArr([...psArr, new PS(psArr.length + 1)]);
  }
  function onDeleteHandle(ps: PS) {
    setPsArr(
      psArr
        .filter((p) => p.Number != ps.Number)
        .map((p, idx) => {
          p.Number = idx + 1;
          return p;
        })
    );
  }

  const onCreateHandle = () => {
    //TODO: check PS`s
    //TODO: check OrderNumber
  };

  return (
    <Container minW={600} maxW={600} h="100vh">
      <Grid templateRows="50px 60px 1fr" h="100%">
        <GridItem bg="#044786" p="0 8px">
          <NewOrderNumberHeader
            number={orderNum}
            onChange={(val) => setOrderNum(val)}
            onCreate={onCreateHandle}
          />
        </GridItem>
        <GridItem p="0 8px" bg="#109dec" borderBottomRadius={5}>
          <NewOrderMenu onAdd={onAddHandle} />
        </GridItem>
        <GridItem p="0 8px" m="8px 0 0 0">
          <PresssheetContainer psArr={psArr} onDelete={onDeleteHandle} />
        </GridItem>
      </Grid>
    </Container>
  );
};

export default NewOrder;
