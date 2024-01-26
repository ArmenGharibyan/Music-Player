import React, { useContext } from "react";
import { useForm } from "react-hook-form";

import { SongContext } from "../Contexts/SongContext";
import styles from "../styles//Global.module.css";


const MusicUploadForm = () => {
  const { uploads, setUploads } = useContext(SongContext);

  const { register, handleSubmit } = useForm();

  return (
    <div>

      <h2>Uploaded Music List</h2>

    <form className={styles[`upload_form`]}


      // a function that allows you to check whether the downloaded 
      // song has a song type of mp3 or wav, and also check that the names of the songs are different and add to uploads array
      onSubmit={handleSubmit((data) => {
        if (
          (data.file[0].type === "audio/wav" ||
            data.file[0].type === "audio/mpeg") &&
          uploads.every((val) => val.songName !== data.songName)
        ) {
          console.log(uploads.every((val) => val.songName !== data.songName));

          setUploads((prev) => [...prev, data]);
        } else {
          alert(
            `please try to upload another type of audio (wav or mp3) or change the name of the song`
          );
        }
      })}
    >
      <input
        type="text"
        {...register("artistName")}
        placeholder="Artist Name"
        required
        className={styles[`song_info`]}
      />
      <input
       className={styles[`song_info`]}
        type="text"
        {...register("songName")}
        placeholder="Song Name"
        required
      />
      <label>
        Select file to upload
      <input className={styles[`upload`]} required type="file" {...register("file")} />
      </label>
      <input className={styles[`submit`]} type="submit" />
    </form>
    </div>

  );
};

export default MusicUploadForm;
