import styles from "./index.module.scss";
import { useGetAll } from "../../utils/hooks/useGet";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { Loader } from "../../Components/Loader";
import { useState } from "react";
import { AllData } from "../../utils/hooks/useGet";
import { Header } from "../../Components/Header";
export const Surahs = () => {
  const useGet = useGetAll(["all"], {
    onSuccess: (e: AllData[]) => setDatas(e),
  });
  const [datas, setDatas] = useState<AllData[] | undefined>([]);
  if (useGet.isLoading) {
    return <Loader />;
  }
  return (
    <>
    <Header></Header>
      <div className={styles.Surahs}>
        <div className={styles.container}>
          <div className={styles.search}>
            <form
              onSubmit={(e: React.SyntheticEvent) => {
                e.preventDefault();
                const target = e.target as typeof e.target & {
                  text: { value: string };
                };

                setDatas(() =>
                  useGet?.data?.filter((i) =>
                    i.englishName
                      .toLowerCase()
                      .includes(target.text.value.toLowerCase().trim())
                  )
                );
              }}
            >
              <input type="text" name="text" />
              <Button variant="contained" type="submit">
                search
              </Button>
            </form>
          </div>
          <div className={styles.wrapper}>
            {datas &&
              datas.map((item) => (
                <Link to={`./${item?.number}`}>
                  <Button variant="contained" className={styles.btn}>
                    <p>{item?.englishName}</p>
                    <b>{item?.numberOfAyahs}</b>
                  </Button>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
