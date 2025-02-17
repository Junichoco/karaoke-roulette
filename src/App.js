import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import React, { useState } from "react";
import Songs from "./Components/Songs";
import Setlist from "./Components/Setlist";
import { Wheel } from "react-custom-roulette";
import "./Components/Wheel";
import "./Components/Songs";
import songs from './Components/Songs';
import { renderToPipeableStream } from 'react-dom/server';

// const data = [
//   { option: "Sing Normally", style: { backgroundColor: "blue", textColor: "white"}},
//   { option: "Anime Voice", style: { backgroundColor: "green", textColor: "white"}},
//   { option: "High Pitch", style: { backgroundColor: "orange", textColor: "white"}},
//   { option: "Low Pitch", style: { backgroundColor: "purple", textColor: "white"}},
//   { option: "Extra Deep Voice", style: { backgroundColor: "brown", textColor: "white"}},
// ]

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

  // const [ unplayedSongs, setUnplayedSongs ] = useState(completeList);
  // var unplayedSongs = songs;
  // var setlistSpeed = "0";

  console.log(`SongList:${songList}`);



  const data = [
    { option: "Sing Normally", optionSize: 3, style: { backgroundColor: "blue", textColor: "white"}},
    { option: "Anime Voice", style: { backgroundColor: "green", textColor: "white"}},
    { option: "High Pitch", optionSize: 2, style: { backgroundColor: "orange", textColor: "white"}},
    { option: "Low Pitch", optionSize: 2, style: { backgroundColor: "purple", textColor: "white"}},
    { option: "Extra Deep", style: { backgroundColor: "brown", textColor: "white"}},
  ]

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

    console.log(`reset newList: ${newList}`);

    setSongList(newList);

    setEndPlaylist(false);
  }

  const handleSpinClick = () => {
    if(!mustSpin){
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
      }
    }

    const displaySong = (style) => {
    // const index = Math.floor(Math.random() * unplayedSongs.length);
    const song = songList[songIndex];

    // const result = `Sing ${song} in a ${style} voice`;
    // document.getElementById("message").innerHTML = result;
    // playedSongs.push(song);



    let new_playedSongs = playedSongs;
    new_playedSongs.push(song);
    setPlayedSongs(new_playedSongs);

    setSongIndex(songIndex + 1);

    console.log(`songIndex: ${songIndex}`);
    // let new_unplayedSongs = unplayedSongs;
    // new_unplayedSongs.splice(index, 1);
    // setUnplayedSongs(new_unplayedSongs);
    // console.log(playedSongs.length);
    // console.log(speed);
    // console.log(unplayedSongs.length);
    // if(unplayedSongs.length === 0){
    //   setUnplayedSongs(completeList);
    // }
    // console.log(`Unplayed Songs: ${unplayedSongs}`);

    setMessage(()=> {
      return(
        <p>Sing <span class="song">{song}</span> in a {style} voice.</p>
      )
    })

    if(playedSongs.length == 2){
    // const marquee = document.getElementById("setlist-marq");
    // marquee.scrollamount = 6;
    setSpeed("6");
    dir = "up";
    console.log("scroll amount changed");
    // marquee.direction = "up";
    }
  }

  if(endPlaylist){
    // reset song index
    setSongIndex(0);
    // reset playlist
    shuffleSongs();

  }

  // constructor(props){
  //   super(props);
  //   this.state = {
  //     setlist: [],
  //   };
  // };

  // render(){
  //   const { setlist } = this.state;


    return(
      <div class="App">
        <div class="header">
          <h1>Karaoke Roulette of Doom</h1>
        </div>
        <div class="wheel-section">
          <div class="next-song">
            <h2>Now Playing</h2>
            <div id="message">
              {message}
            </div>
            <div id="setlist">
              <h2>Setlist</h2>
              {/* <marquee id="setlist-marq" scrollamount={speed}> */}
              <Setlist
                playedSongs={playedSongs}
                scrollSpeed={speed}
                dir={dir}
                />
              {/* </marquee> */}
            </div>
          </div>
          <div class="wheel">

            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={data}
              spinDuration={0.3}

              onStopSpinning={() => {
                setMustSpin(false);
                // console.log(data[prizeNumber].option);
                style = data[prizeNumber].option;
                displaySong(data[prizeNumber].option);

                if(songIndex === songList.length - 1){
                  setEndPlaylist(true);
                  console.log("End of playlist");
                  // reset song index
                  setSongIndex(0);
                  // reset playlist
                  shuffleSongs();
                }
              }}
            />
            <button class="spin-button" onClick={handleSpinClick}>SPIN</button>

          </div>
        </div>

      </div>
    )
  // };

}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Karaoke Wheel of Doom</h1>
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }


export default App;
