import type { NextPage } from "next";
import Head from "next/head";

import { useRecoilState } from "recoil";
import { editOrderState } from "../atoms/editOrderState";
import Order from "../models/order";
import styles from "../styles/Home.module.css";
import NextLink from "next/link";
import { Button, HStack, Link } from "@chakra-ui/react";

const Home: NextPage = () => {
  const [, setEditOrder] = useRecoilState(editOrderState);

  function onCreateOrderHandle() {
    setEditOrder({ order: new Order(), isNew: true });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Бровафарма заявки</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Заявки для «Бровафарма»</h1>
        <HStack>
          <NextLink
            href={{
              pathname: "/order/new",
            }}
          >
            <Link>
              <Button onClick={onCreateOrderHandle}>
                Створити нову заявку
              </Button>
            </Link>
          </NextLink>
          <NextLink
            href={{
              pathname: "/orders",
            }}
          >
            <Link>
              <Button>список заявок</Button>
            </Link>
          </NextLink>
        </HStack>
      </main>
    </div>
  );
};

export default Home;
