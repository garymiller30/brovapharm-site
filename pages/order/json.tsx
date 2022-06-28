import { Box, Button, Center, Spinner, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const OrderJson: NextPage = () => {
  const [order, setOrder] = useState<any>();
  const router = useRouter();

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
      data: JSON.stringify(order),
      fileName: "order.json",
      fileType: "text/json",
    });
  };

  useEffect(() => {
    if (!router.isReady) return;

    async function getOrder() {
      const id = router.query.id as string;

      if (id) {
        const res = await fetch(`/api/order?id=${id}`);
        const o = await res.json();
        setOrder(o);
      }
    }
    getOrder();
  }, [router.isReady]);

  if (!router.isReady || !order)
    return (
      <Box w="100vw" h="100vh">
        <Center h="100%">
          <Spinner size="xl" /> <Text m={5}>Завантажую...</Text>
        </Center>
      </Box>
    );

  return <Button onClick={exportToJson}>Download</Button>;
  //return <Box>завантажено</Box>;
};

export default OrderJson;
