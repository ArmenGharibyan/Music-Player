import React, { useContext, useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import SongRow from "../components/SongRow";
import { SongContext } from "../Contexts/SongContext";
import styles from "../styles//Global.module.css";

const UploadedSongList = () => {
  const { uploads, search, setUploads } = useContext(SongContext);
  const [addUpload, setAddUpload] = useState(false);


  //timeout for progress bar
  useEffect(() => {
    setAddUpload(true);
     setTimeout(() => {
      setAddUpload(false);
    }, 2000);
  }, [uploads]);

  return (
    <div>
      {!addUpload ? (
        uploads
        //filtering uploads with search input value
          .filter((val) => {
            return search.toLocaleLowerCase() === ""
              ? val
              : val.songName.toLocaleLowerCase().includes(search) ||
                  val.artistName.toLocaleLowerCase().includes(search) ||
                  val.songName.toLocaleUpperCase().includes(search) ||
                  val.artistName.toLocaleUpperCase().includes(search);
          })
          .map((song, ind) => (
            <SongRow
              trackNumber={ind + 1}
              audioName={song.songName}
              key={uuidv4()}
              songName={song.songName}
              artistName={song.artistName}
              file={URL.createObjectURL(song.file[0])}
              deleteHandler={(e) => {
                const deleteUploadData = uploads.filter((val) => {
                  console.log(
                    e.target.parentElement.parentElement.lastChild.id
                  );
                  return (
                    val.songName !==
                      e.target.parentElement.parentElement.lastChild.id && val
                  );
                });
                return setUploads(deleteUploadData);
              }}
            />
          ))
      ) : (
        <div className={styles[`loading-wrapper`]}>
          <div className={styles[`loading-bar`]}></div>
        </div>
      )}
    </div>
  );
};

export default UploadedSongList;
