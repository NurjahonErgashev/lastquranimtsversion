import React from "react";
import styles from "./index.module.scss";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeIcon from "@mui/icons-material/Home";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useStorage } from "../../utils/storage/storage";
import author from "../Autors/author-audio.json";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export function Header() {
  const [open, setOpen] = React.useState(false);
  const [lan, setLan] = React.useState<string>("");
  const [auth, setAuth] = React.useState<string>("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const nav = useNavigate();
  const setWrote = useStorage((state) => state.setWrote);
  const setAuthor = useStorage((state) => state.setAuthor);

  return (
    <header>
      <nav className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.item}>
            {" "}
            <Button variant="outlined" onClick={() => nav(-1)}>
              {" "}
              <ChevronLeftIcon></ChevronLeftIcon>{" "}
            </Button>
          </div>
          <div className={styles.item}>
            <Button variant="contained" onClick={() => nav("/")}>
              <HomeIcon></HomeIcon>{" "}
            </Button>
          </div>
          <div className={styles.item}>
            <Button variant="outlined" onClick={handleOpen}>
              <SettingsSuggestIcon></SettingsSuggestIcon>
            </Button>
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                select
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label">Language</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    // value={'hello'}
                    label="Age"
                    onChange={(event) => {
                      setLan(`${event.target.value}`);
                    }}
                  >
                    <MenuItem value={"en.asad"}>en</MenuItem>
                    <MenuItem value={"ru.kuliev"}>ru</MenuItem>
                    <MenuItem value={"uz.sodik"}>uz</MenuItem>
                    <MenuItem value={"ar.alafasy"}>ar</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label">Author</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    // value={'hello'}
                    label="Age"
                    onChange={(event) => {
                      setAuth(`${event.target.value}`);
                    }}
                  >
                    {author.map(
                      (item: { img: string; name: string; value: string }) => (
                        <MenuItem value={item.value}>{item.name}</MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  if (lan) {
                    setWrote(lan);
                  }
                  if (auth) {
                    setAuthor(auth);
                  }
                }}
              >
                send
              </Button>
            </Box>
          </Modal>
        </div>
      </nav>
    </header>
  );
}
