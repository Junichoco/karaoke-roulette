import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import React, { useState } from "react";
import Songs from "./Components/Songs";
import Setlist from "./Components/Setlist";
import { Wheel } from "react-custom-roulette";
// import "./Components/Wheel";
import "./Components/Songs";
import songs from './Components/Songs';
import wheelData from "./Components/WheelData";
import { renderToPipeableStream } from 'react-dom/server';



function App() {
  const [ mustSpin, setMustSpin ] = useState(false);
  const [ prizeNumber, setPrizeNumber ] = useState(0);

  const [ endPlaylist, setEndPlaylist ] = useState(true);
  const [ playedSongs, setPlayedSongs ] = useState([]);
  const [ message, setMessage ] = useState("");
  const [ speed, setSpeed ] = useState("1");
  const [ songIndex, setSongIndex ] = useState(0);
  const [ songList, setSongList ] = useState([]);
  // const [ completeList, setCompleteList ] = useState([]);

  let style = "";
  let dir = "down";

  // console.log(`SongList:${songList}`);

  const shuffleSongs = () => {
    let newList = songs;
    let currentIndex = newList.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [newList[currentIndex], newList[randomIndex]] = [
        newList[randomIndex], newList[currentIndex]];
    }

    // console.log(`reset newList: ${newList}`);

    setSongList(newList);

    setEndPlaylist(false);
  }

  const handleSpinClick = () => {
    if(!mustSpin){
      const newPrizeNumber = Math.floor(Math.random() * wheelData.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
      }
    }

    const displaySong = (style) => {
    // const index = Math.floor(Math.random() * unplayedSongs.length);
    const song = songList[songIndex];

    let new_playedSongs = playedSongs;
    new_playedSongs.push(song);
    setPlayedSongs(new_playedSongs);

    setSongIndex(songIndex + 1);

    // console.log(`songIndex: ${songIndex}`);


    setMessage(()=> {
      switch(style){
        case "High":
        case "Low":
          return(
            <p>Sing <span class="song">{song}</span> in a <span class="style">{style} Voice</span>.</p>
          )
          break;
        case "Anime Voice":
          return(
            <p>Sing <span class="song">{song}</span> in an <span class="style">{style}</span>.</p>
          )
          break;
        case "Extra Low":
          return(
            <p>Sing <span class="song">{song}</span> in an <span class="style">{style} Voice</span>.</p>
          )
          break;
        case "Sing Normally":
          return(
            <p>Sing <span class="song">{song}</span> <span class="style">Normally</span>.</p>
          )
          break;
      }
    })

    if(playedSongs.length == 2){
    // const marquee = document.getElementById("setlist-marq");
    // marquee.scrollamount = 6;
    setSpeed("6");
    dir = "up";
    // console.log("scroll amount changed");
    // marquee.direction = "up";
    }
  }

  if(endPlaylist){
    // reset song index
    setSongIndex(0);
    // reset playlist
    shuffleSongs();

  }

    return(
      <div class="App">
        <div class="header">
          <h1>Karaoke Roulette of Doom</h1>
        </div>
        <div class="wheel-section">
          <div class="setlist-container">
            <div id="setlist">
              <h2>Setlist</h2>
              <Setlist
                playedSongs={playedSongs}
                scrollSpeed={speed}
                dir={dir}
                />
            </div>
          </div>
          <div class="wheel">
          <h2>Now Playing</h2>
            <div id="message">
              {message}
            </div>
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={wheelData}
              spinDuration={0.3}

              onStopSpinning={() => {
                setMustSpin(false);
                // console.log(data[prizeNumber].option);
                style = wheelData[prizeNumber].option;
                displaySong(wheelData[prizeNumber].option);

                if(songIndex === songList.length - 1){
                  setEndPlaylist(true);
                  // console.log("End of playlist");
                  // reset song index
                  setSongIndex(0);
                  // reset playlist
                  shuffleSongs();
                }
              }}
            />
            <button class="css-button-gradient--4" onClick={handleSpinClick}>SPIN</button>

          </div>
        </div>

      </div>
    )

}



export default App;
