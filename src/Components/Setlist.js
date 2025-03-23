import React, { Component } from "react";

class Setlist extends Component {
  render(){
    const {playedSongs, scrollSpeed, dir} = this.props;

    return(

      <div id="setlist-scroll">
        {playedSongs.map((song, index) => {
          return(
            <div>
              <p>{index + 1}. {song}</p>
            </div>
          )
        })}
      </div>
    )
  }
}

export default Setlist
