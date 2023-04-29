import { Button } from "@mui/material";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className={styles.Home}>
      <div className={styles.container}>
        <Link to="/surah">
          <Button variant="outlined">quran</Button>
        </Link>
        <Link to="/time">
          <Button variant="outlined" >prayer times</Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
