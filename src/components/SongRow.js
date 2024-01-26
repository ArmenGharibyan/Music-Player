import { useContext, useEffect, useRef, useState } from "react";
import { FaPlay, FaCaretDown } from "react-icons/fa";
import ReactAudioPlayer from "react-audio-player";
import {MdDelete } from "react-icons/md";

import { SongContext } from "../Contexts/SongContext";
import styles from "../styles//Global.module.css";

const SongRow = ({
  songName,
  artistName,
  trackNumber,
  file,
  deleteHandler,
  audioName,
  audioRef,
}) => {
  const [play, setPlay] = useState(false);
  const { playAll } = useContext(SongContext);
  const audio_ref = useRef("");
  audioRef = audio_ref;

  //effect for play all button
  useEffect(() => {
    playAll
      ? audioRef.current.audioEl.current.play()
      : audioRef.current.audioEl.current.pause();
  }, [playAll]);


//function to start song in list
  const startMusic = () => {
    setPlay(!play);
    play
      ? audioRef.current.audioEl.current.play()
      : audioRef.current.audioEl.current.pause();
  };

  //function to hide and show more information about audio
  const showAudio = () => {
    console.log(audioRef.current.audioEl.current.className);
    audioRef.current.audioEl.current.className ===
    "react-audio-player Global_audio__FXM96"
      ? (audioRef.current.audioEl.current.className =
          "react-audio-player Global_hidden_audio__qE6F6")
      : (audioRef.current.audioEl.current.className =
          "react-audio-player Global_audio__FXM96");
  };

  return (
    <div id={trackNumber} className={styles[`song_row`]}>
      <div className={styles[`row`]}>
        <button className={styles[`buttons`]} onClick={startMusic}>
          <FaPlay className={styles[`play`]} />
        </button>
        <div className={styles[`info`]}>
          <span>{songName}</span>
          <span>{artistName}</span>
          <span>{trackNumber}</span>
        </div>
        <button onClick={deleteHandler} className={styles[`buttons`]}>
          {" "}
          <MdDelete className={styles[`delete`]} />
        </button>
        <button onClick={showAudio} className={styles[`buttons`]}>
          <FaCaretDown />
        </button>
      </div>

      <ReactAudioPlayer
        id={audioName}
        ref={audioRef}
        controls
        className={styles[`hidden_audio`]}
        src={file}
      />
    </div>
  );
};

export default SongRow;
