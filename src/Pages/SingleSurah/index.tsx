import styles from "./index.module.scss";
import { useParams } from "react-router-dom";
import { useGetForId, useGetlang } from "../../utils/hooks/useGet";
import { Loader } from "../../Components/Loader";
import { useStorage } from "../../utils/storage/storage";
import { Header } from "../../Components/Header";
interface Ayahs {
  number: number;
  audio: string;
  text: string;
  numberInSurah: number;
}

export const SingleSurahs = () => {
  const { id } = useParams();
  const author = useStorage((state) => state.author);
  const audio = useStorage((state) => state.audio);
  const setAudio = useStorage((state) => state.setAudio);
  const useGetLanguage = useGetlang([`${author} `, `${id}`], `${id}`);
  const useGet = useGetForId(["item", Number(id)], `${id}/${author}`);
  const setStatus = useStorage((state) => state.setStatus);
  const status = useStorage((state) => state.status);

  if (useGet.isLoading) {
    return <Loader></Loader>;
  }
  const items = useGet?.data?.data?.data?.ayahs;

  return (
    <>
      <Header></Header>
      <div className={styles.Single}>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            {items.map((i: Ayahs, index: any) => (
              <div
                className={styles.card}
                style={{
                  background:
                    audio == i.number
                      ? "rgb(199, 238, 58)"
                      : "rgb(238, 196, 58)",
                }}
              >
                <p>{useGetLanguage.data?.[i.number]?.text}</p>
                <b>
                  {id} : {index + 1}
                </b>
                <button
                  onClick={(e) => {
                    setAudio(i.number);
                    console.log(status);
                    if (status.number == i.number && status.status == "play") {
                      setStatus(Number(status.number), "pause");
                      e.currentTarget.textContent = "play";
                    } else if (
                      status.number == i.number &&
                      status.status == "pause"
                    ) {
                      setStatus(Number(status.number), "play");
                      e.currentTarget.textContent = "pause";
                    }
                  }}
                >
                  {status.number == i.number ? "pause" : "play"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
