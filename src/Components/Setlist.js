import React, { Component } from "react";

class Setlist extends Component {
  render(){
    const {playedSongs, scrollSpeed} = this.props;

    return(

      <marquee id="setlist-marq" scrollamount={scrollSpeed}>
        {playedSongs.map((song, index) => {
          return(
            <p>{index + 1}. {song}</p>
          )
        })}
      </marquee>
    )
  }
}

export default Setlist
