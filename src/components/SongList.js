import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import Header from "./Header";
import SongRow from "./SongRow";
import MusicUploadForm from "./MusicUploadForm";
import { SongContext } from "../Contexts/SongContext";
import UploadedSongList from "./UploadedSongList";
import styles from "../styles//Global.module.css";


const SongList = () => {
  const [uploads, setUploads] = useState([]);
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [playAll, setPlayAll] = useState(false);


  //getting music data from json
  useEffect(() => {
    axios({
      method: "GET",
      url: `db.json`,
    })
      .then((res) => {
        console.log(res.data);
        setData(res.data.songs);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={styles[`song_list`]}>
      <SongContext.Provider
        value={{ setSearch, setPlayAll, playAll, data, setData }}
      >
        <Header />
      </SongContext.Provider>

      <div>
        <div className={styles[`song_title`]}>
          <div className={styles[`song_title_inner`]}>
            <span>Song Name</span>
            <span>Atrist Name</span>
            <span>Track</span>
          </div>
        </div>
        {data ? (
          data
        //filtering data with search input value
            .filter((val) => {
              return search.toLocaleLowerCase() === ""
                ? val
                : val.songName.toLocaleLowerCase().includes(search) ||
                    val.artistName.toLocaleLowerCase().includes(search) ||
                    val.songName.toLocaleUpperCase().includes(search) ||
                    val.artistName.toLocaleUpperCase().includes(search);
            })
            //mapping through data array for drawing song rows
            .map((val) => (
              <SongContext.Provider   key={uuidv4()}
                value={{ playAll, data, setData, setUploads, uploads }}
              >
                <SongRow
                
                  songName={val.songName}
                  artistName={val.artistName}
                  trackNumber={val.trackNumber}
                  file={val.file}

                  //delete function to remove song row from song list and data array
                  deleteHandler={(e) => {
                    const deleteData = data.filter((val) => {
                      console.log(
                        val.trackNumber,
                        +e.target.parentElement.parentElement.id,
                        e.target.parentElement.parentElement.trackNumber
                      );
                      return (
                        val.trackNumber !==
                          +e.target.parentElement.parentElement.id && val
                      );
                    });
                    return setData(deleteData);
                  }}
                />
              </SongContext.Provider>
            ))
        ) : (
          <div className={styles[`progress-bar`]}></div>
        )}
      </div>
      <SongContext.Provider
        value={{ uploads, setUploads, data, setData, search, setSearch }}
      >
        <MusicUploadForm />
        <UploadedSongList />
      </SongContext.Provider>
    </div>
  );
};

export default SongList;
