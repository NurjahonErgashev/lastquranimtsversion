import Home from "./Pages/Home";
import { Surahs } from "./Pages/Surahs";
import { SingleSurahs } from "./Pages/SingleSurah";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Player from "./Components/Player";
import Time from "./Pages/Time";

function App() {
  return (
    <div className="App" >
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/surah" element={<Surahs />} />
        <Route path="/time" element={<Time />} />
        <Route path="/surah/:id" element={<SingleSurahs />} />
      </Routes>
      <Player></Player>
    </div>
  );
}

export default App;
