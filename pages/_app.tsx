import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, ScaleFade } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <ChakraProvider>
      <RecoilRoot>
        <NextNProgress />
        <ScaleFade key={router.route} initialScale={0.9} in={true}>
          <Component {...pageProps} />
        </ScaleFade>
      </RecoilRoot>
    </ChakraProvider>
  );
}

export default MyApp;
