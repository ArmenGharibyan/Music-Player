import { useContext, useState } from "react";
import { FaPlay, FaPlus } from "react-icons/fa";
import { GoArrowSwitch } from "react-icons/go";

import { SongContext } from "../Contexts/SongContext";
import styles from "../styles//Global.module.css";

const Header = () => {
  const { setSearch, setPlayAll, playAll, data, setData } =
    useContext(SongContext);

  const [trackNumber, setTrackNumber] = useState(false);

  return (
    <div  className={styles[`header`]}>
      <div>
        <button 
          onClick={() => {
            console.log(`You clicked on Play All button`);
            setPlayAll(!playAll);
          }}
        >
          {" "}
          <FaPlay /> Play All
        </button>
        <button>
          {" "}
          <FaPlus /> Add All
        </button>
      </div>

      <div>
        <button
        // function to sort songs track numbers 0-100 or 100-0
          onClick={() => {
            if (trackNumber) {
              const trackDescending = [...data].sort(
                (a, b) => b.trackNumber - a.trackNumber
              );

              setData(trackDescending);
            } else {
              const trackDescending = [...data].sort(
                (a, b) => a.trackNumber - b.trackNumber
              );

              setData(trackDescending);
            }
            setTrackNumber(!trackNumber);
          }}
        >
          {" "}
          <GoArrowSwitch className={styles[`track_arrows`]} /> Track Number
        </button>
        <input
          id="search"
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          className={styles[`search`]}
          placeholder="Filter"
        />
      </div>
    </div>
  );
};

export default Header;
