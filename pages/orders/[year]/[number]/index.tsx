import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import getOrderByYearAndNumber from "../../../../lib/order/getOrderByYearAndNumber";

export default () => {
  return null;
};

// export default () => {
//   const router = useRouter();
//   const { year, number } = router.query;
//   const [order, setOrder] = useState<null>(null);

//   interface downloadFileProps {
//     data: string;
//     fileName: string;
//     fileType: string;
//   }

//   const downloadFile = ({ data, fileName, fileType }: downloadFileProps) => {
//     // Create a blob with the data we want to download as a file
//     const blob = new Blob([data], { type: fileType });
//     // Create an anchor element and dispatch a click event on it
//     // to trigger a download
//     const a = document.createElement("a");
//     a.download = fileName;
//     a.href = window.URL.createObjectURL(blob);
//     const clickEvt = new MouseEvent("click", {
//       view: window,
//       bubbles: true,
//       cancelable: true,
//     });
//     a.dispatchEvent(clickEvt);
//     a.remove();
//   };

//   // find order
//   useEffect(() => {
//     if (!router.isReady) return;

//     const download = async () => {
//       const res = await fetch(`/api/find?year=${year}&number=${number}`);
//       const order = await res.json();
//       setOrder(order);
//     };

//     download();
//   }, [router.isReady]);

//   if (!order || !router.isReady) return;

//   downloadFile({
//     data: JSON.stringify(order),
//     fileName: "order.json",
//     fileType: "text/json",
//   });

//   return (
//     <>
//       <p>{JSON.stringify(order)}</p>
//     </>
//   );
// };

export const getServerSideProps: GetServerSideProps = async ({
  res,
  query,
}) => {
  const { year, number } = query;

  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (year && number) {
    try {
      const order = await getOrderByYearAndNumber(+year, +number);
      res.write(JSON.stringify(order));
    } catch {
      res.write("{}");
    }
  } else {
    res.write("{}");
  }

  res.end();
  return { props: {} };
};
