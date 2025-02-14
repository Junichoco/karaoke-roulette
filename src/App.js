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
  const [ playedSongs, setPlayedSongs ] = useState([]);
  const [ message, setMessage ] = useState("");
  const [ speed, setSpeed ] = useState("1");
  var currentSong = "song";
  var unplayedSongs = songs;
  // var setlistSpeed = "0";

  var style = "";

  const data = [
    { option: "Sing Normally", optionSize: 3, style: { backgroundColor: "blue", textColor: "white"}},
    { option: "Anime Voice", style: { backgroundColor: "green", textColor: "white"}},
    { option: "High Pitch", optionSize: 2, style: { backgroundColor: "orange", textColor: "white"}},
    { option: "Low Pitch", optionSize: 2, style: { backgroundColor: "purple", textColor: "white"}},
    { option: "Extra Deep", style: { backgroundColor: "brown", textColor: "white"}},
  ]

  const handleSpinClick = () => {
    if(!mustSpin){
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  }

  const displaySong = (style) => {
    const song = unplayedSongs[Math.floor(Math.random() * unplayedSongs.length)]
    const result = `Sing ${song} in a ${style} voice`;
    // document.getElementById("message").innerHTML = result;

    // playedSongs.push(song);

    var newList = playedSongs;
    newList.push(song);

    setPlayedSongs(newList);
    console.log(playedSongs.length);
    console.log(speed);

    setMessage(()=> {
      return(
        <p>Sing <span class="song">{song}</span> in a {style} voice.</p>
      )
    })

    if(playedSongs.length == 2){
    // const marquee = document.getElementById("setlist-marq");
    // marquee.scrollamount = 6;
    setSpeed("6");
    console.log("scroll amount changed");
    // marquee.direction = "up";
    }

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
                console.log(data[prizeNumber].option);
                style = data[prizeNumber].option;
                displaySong(data[prizeNumber].option);
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
