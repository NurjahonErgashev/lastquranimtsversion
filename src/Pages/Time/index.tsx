import { useEffect, useRef } from "react";
import styles from "./index.module.scss";
import { Button, Dropdown } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStorage } from "../../utils/storage/storage";
import axios from "axios";
import { Header } from "../../Components/Header";

interface Times {
  region: string;
  date: string;
  weekday: string;
  times: {
    tong_saharlik: string;
    quyosh: string;
    peshin: string;
    asr: string;
    shom_iftor: string;
    hufton: string;
  };
}

export default function Time() {
  const [datas, setDatas] = useState<Times | null>(null);
  const nav = useNavigate();
  const context = useStorage((state) => state.context);
  const setContext = useStorage((state) => state.setContext);
  const [dateNow, setDate] = useState(getTime());
  const times = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setInterval(() => {
      setDate(getTime());
    }, 1000);
  }, []);

  useEffect(() => {
    axios
      .get(`https://islomapi.uz/api/present/day?region=${context}`)
      .then((data) => setDatas(data.data));
  }, [context]);
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
  if (datas != null) {
    const arrData: (string | number)[] = Object.values(datas.times);
    let newArr = arrData
      .sort((a, b) => a - b)
      .map((e, i) => e.split(":").join(""));
    let num: any = newArr.find((e: any) => e >= strData);
    const activeCardIndex = newArr.indexOf(num);
    const notActiveCardIndex: number[] = newArr
      .map((item: any, index: number) => index != activeCardIndex && index)
      .filter((i: any) => ![false].includes(i));

    times.current?.children &&
      times.current?.children[notActiveCardIndex[0]]?.classList.add(
        "notActive"
      );
    times.current?.children &&
      times.current?.children[notActiveCardIndex[1]].classList.add("notActive");
    times.current?.children &&
      times.current.children[notActiveCardIndex[2]].classList.add("notActive");
    times.current?.children &&
      times.current?.children[notActiveCardIndex[3]].classList.add("notActive");
    times.current?.children &&
      times.current?.children[notActiveCardIndex[4]].classList.add("notActive");
    times.current?.children &&
      times.current?.children[activeCardIndex].classList.add("active");
  }

  const items = [
    {
      key: "1",
      label: (
        <b
          onClick={(e) => setContext(e.target.textContent)}
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Andijon
        </b>
      ),
    },
    {
      key: "2",
      label: (
        <b
          onClick={(e) => setContext("Buxoro")}
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Buxoro
        </b>
      ),
    },
    {
      key: "3",
      label: (
        <b
          onClick={(e) => setContext("Jizzax")}
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          Jizzax
        </b>
      ),
    },
    {
      key: "4",
      label: (
        <b
          onClick={(e) => setContext("Qashqadaryo")}
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          Qashqadaryo
        </b>
      ),
    },
    {
      key: "5",
      label: (
        <b
          onClick={() => setContext("Navoiy")}
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          Navoiy
        </b>
      ),
    },
    {
      key: "6",
      label: (
        <b
          onClick={(e) => setContext("Namangan")}
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          Namangan
        </b>
      ),
    },
    {
      key: "7",
      label: (
        <b
          onClick={(e) => setContext("Sirdaryo")}
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          Sirdaryo
        </b>
      ),
    },
    {
      key: "8",
      label: (
        <b
          onClick={(e: any) => setContext("Samarqand")}
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          Samarqand
        </b>
      ),
    },
    {
      key: "9",
      label: (
        <b
          onClick={(e) => setContext("  Surxondaryo")}
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          Surxondaryo
        </b>
      ),
    },
    {
      key: "10",
      label: (
        <b
          onClick={(e) => setContext("Toshkent")}
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          Toshkent
        </b>
      ),
    },
    {
      key: "11",
      label: (
        <b
          onClick={(e) => setContext(`Farg'ona`)}
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          Farg'ona
        </b>
      ),
    },
    {
      key: "11",
      label: (
        <b
          onClick={(e) => setContext("Xorazm")}
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          Xorazm
        </b>
      ),
    },
  ];
  return (
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
              <h2>{datas != null && datas.weekday}</h2>
              <h1>
                {dateNow.hours + ":" + dateNow.minutes + ":" + dateNow.seconds}
              </h1>
            </div>
          </div>
          <div className={styles.times} ref={times}>
            <div className={styles.card}>
              <h2>Tong</h2>
              <div className={styles.img}>
                <img src="https://namoz-vaqti.vercel.app/img/Tong.png" alt="" />
              </div>
              <h1>{datas != null && datas.times.tong_saharlik}</h1>
            </div>
            <div className={styles.card}>
              <h2>Quyosh</h2>
              <div className={styles.img}>
                <img
                  src="https://namoz-vaqti.vercel.app/img/Quyosh.png"
                  alt=""
                />
              </div>
              <h1>{datas != null && datas.times.quyosh}</h1>
            </div>
            <div className={styles.card}>
              <h2>Peshin</h2>
              <div className={styles.img}>
                <img
                  src="https://namoz-vaqti.vercel.app/img/Peshin.png"
                  alt=""
                />
              </div>
              <h1>{datas != null && datas.times.peshin}</h1>
            </div>
            <div className={styles.card}>
              <h2>Asr</h2>
              <div className={styles.img}>
                <img src="https://namoz-vaqti.vercel.app/img/Asr.png" alt="" />
              </div>
              <h1>{datas != null && datas.times.asr}</h1>
            </div>
            <div className={styles.card}>
              <h2>Shom</h2>
              <div className={styles.img}>
                <img src="https://namoz-vaqti.vercel.app/img/Shom.png" alt="" />
              </div>
              <h1>{datas != null && datas.times.shom_iftor}</h1>
            </div>
            <div className={styles.card}>
              <h2>Xufton</h2>
              <div className={styles.img}>
                <img
                  src="https://namoz-vaqti.vercel.app/img/Xufton.png"
                  alt=""
                />
              </div>
              <h1>{datas != null && datas.times.hufton}</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
