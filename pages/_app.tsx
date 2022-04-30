import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import NextNProgress from "nextjs-progressbar";

import LogRocket from "logrocket";
LogRocket.init("gyvzco/brovapharma");
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <RecoilRoot>
        <NextNProgress />
        <Component {...pageProps} />
      </RecoilRoot>
    </ChakraProvider>
  );
}

export default MyApp;
