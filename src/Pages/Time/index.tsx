import { useEffect, useRef } from "react";
import styles from "./index.module.scss";
import { Button, Dropdown } from "antd";
import { useState } from "react";
import { useStorage } from "../../utils/storage/storage";
import axios from "axios";
import { Header } from "../../Components/Header";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../../Components/Loader";

export default function Time() {
  const context = useStorage((state) => state.context);
  const setContext = useStorage((state) => state.setContext);
  const [dateNow, setDate] = useState(getTime());
  const times = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setInterval(() => {
      setDate(getTime());
    }, 1000);
  }, []);

  const data = useQuery(['region', context], () => axios
    .get(`https://islomapi.uz/api/present/day?region=${context}`)
    .then((data) => data.data))
  function getTime() {
    const date = new Date(),
      hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
      minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
      seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return { hours, minutes, seconds };
  }

  const strData = [dateNow.hours, dateNow.minutes].join("");
  useEffect(() => {
    if (times.current != null) {
      // console.log(times.current);

      // nmadr()
      const arrData: (string)[] = Object.values(data.data.times);

      const newArr: string[] = arrData
        .sort((a: any, b: any) => a - b)
        .map((e: any) => e.split(":").join(""));
      const num: string | undefined = newArr.find((e) => e >= strData);
      console.log(num);


      if (!num) {
        const notActiveCardIndex: (number | false)[] = [1, 2, 3, 4, 5]

        if (
          typeof notActiveCardIndex[0] != 'boolean' &&
          notActiveCardIndex[1] &&
          notActiveCardIndex[2] &&
          notActiveCardIndex[3] &&
          notActiveCardIndex[4]
        ) {
          times.current?.children &&
            times.current?.children[notActiveCardIndex[0]]?.classList.add(
              styles.notActive
            );
          times.current?.children &&
            times.current?.children[notActiveCardIndex[1]].classList.add(
              styles.notActive
            );
          times.current?.children &&
            times.current.children[notActiveCardIndex[2]].classList.add(
              styles.notActive
            );
          times.current?.children &&
            times.current?.children[notActiveCardIndex[3]].classList.add(
              styles.notActive
            );
          times.current?.children &&
            times.current?.children[notActiveCardIndex[4]].classList.add(
              styles.notActive
            );
          times.current?.children &&
            times.current?.children[0].classList.add(styles.active);
        }
      }
      if (num) {
        const activeCardIndex = newArr.indexOf(num);
        const notActiveCardIndex: (number | false)[] = newArr
          .map((_: any, index: number) => index != activeCardIndex && index)
          .filter((i: any) => ![false].includes(i));

        if (
          typeof notActiveCardIndex[0] != 'boolean' &&
          notActiveCardIndex[1] &&
          notActiveCardIndex[2] &&
          notActiveCardIndex[3] &&
          notActiveCardIndex[4]
        ) {
          times.current?.children &&
            times.current?.children[notActiveCardIndex[0]]?.classList.add(
              styles.notActive
            );
          times.current?.children &&
            times.current?.children[notActiveCardIndex[1]].classList.add(
              styles.notActive
            );
          times.current?.children &&
            times.current.children[notActiveCardIndex[2]].classList.add(
              styles.notActive
            );
          times.current?.children &&
            times.current?.children[notActiveCardIndex[3]].classList.add(
              styles.notActive
            );
          times.current?.children &&
            times.current?.children[notActiveCardIndex[4]].classList.add(
              styles.notActive
            );
          times.current?.children &&
            times.current?.children[activeCardIndex].classList.add(styles.active);
        }
      }
    }
  }, [times.current])
  if (data.isLoading) {
    return <Loader></Loader>
  }
  const items = [
    {
      key: "1",
      label: <b onClick={() => setContext(`Andijon`)}>Andijon</b>,
    },
    {
      key: "2",
      label: <b onClick={() => setContext("Buxoro")}>Buxoro</b>,
    },
    {
      key: "3",
      label: <b onClick={() => setContext("Jizzax")}>Jizzax</b>,
    },
    {
      key: "5",
      label: <b onClick={() => setContext("Navoiy")}>Navoiy</b>,
    },
    {
      key: "6",
      label: <b onClick={() => setContext("Namangan")}>Namangan</b>,
    },

    {
      key: "7",
      label: <b onClick={() => setContext("Samarqand")}>Samarqand</b>,
    },

    {
      key: "8",
      label: <b onClick={() => setContext("Toshkent")}>Toshkent</b>,
    },
    {
      key: "9",
      label: <b onClick={() => setContext(`Farg'ona`)}>Farg'ona</b>,
    },

  ];

  return data.data && (
    <>
      <Header></Header>
      <div className={styles.Time}>
        <h1>Nomoz Vaqtlari</h1>
        <div className={styles.container}>
          <div className={styles.text}>
            <h2>Hududni tanlang:</h2>
            <h2>
              <Dropdown
                menu={{
                  items,
                }}
                placement="bottomLeft"
              >
                <Button
                  style={{
                    background: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                  }}
                >
                  {context}
                </Button>
              </Dropdown>
            </h2>
          </div>
          <div className={styles.info}>
            <h2>
              Mintaqa : <span>{context} shahri</span>
            </h2>
            <div className={styles.day}>
              <h2>{data.data.date}</h2>
              <h1>
                {dateNow.hours + ":" + dateNow.minutes + ":" + dateNow.seconds}
              </h1>
            </div>
          </div>
          <div className={styles.times} ref={times}>
            <div className={styles.card} >
              <h2>Tong</h2>
              <div className={styles.img}>
                <img src="https://namoz-vaqti.vercel.app/img/Tong.png" alt="" />
              </div>
              <h1>{data.data.times.tong_saharlik}</h1>
            </div>
            <div className={styles.card}>
              <h2>Quyosh</h2>
              <div className={styles.img}>
                <img
                  src="https://namoz-vaqti.vercel.app/img/Quyosh.png"
                  alt=""
                />
              </div>
              <h1>{data.data.times.quyosh}</h1>
            </div>
            <div className={styles.card}>
              <h2>Peshin</h2>
              <div className={styles.img}>
                <img
                  src="https://namoz-vaqti.vercel.app/img/Peshin.png"
                  alt=""
                />
              </div>
              <h1>{data.data.times.peshin}</h1>
            </div>
            <div className={styles.card}>
              <h2>Asr</h2>
              <div className={styles.img}>
                <img src="https://namoz-vaqti.vercel.app/img/Asr.png" alt="" />
              </div>
              <h1>{data.data.times.asr}</h1>
            </div>
            <div className={styles.card}>
              <h2>Shom</h2>
              <div className={styles.img}>
                <img src="https://namoz-vaqti.vercel.app/img/Shom.png" alt="" />
              </div>
              <h1>{data.data.times.shom_iftor}</h1>
            </div>
            <div className={styles.card}>
              <h2>Xufton</h2>
              <div className={styles.img}>
                <img
                  src="https://namoz-vaqti.vercel.app/img/Xufton.png"
                  alt=""
                />
              </div>
              <h1>{data.data.times.hufton}</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
