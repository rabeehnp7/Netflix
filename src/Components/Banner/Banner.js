import React, { useState, useEffect } from "react";
import "./Banner.css";
import axios from "../../Axios";
import { ApiKey, imageUrl } from "../../constants/Constants";

function Banner() {
  const [movie, setMovie] = useState([]);
  const [count,setCount] = useState(0)
  useEffect(() => {
    setCount(prevCount=> prevCount+1)
    console.log(count)     
    axios
      .get(`trending/all/week?api_key=${ApiKey}&language=en-US`)
      .then((response) => {
        console.log(response.data.results[2]);
        setMovie(response.data.results[count]);
      });
  }, []); 

  return (
    <div
      style={{
        backgroundImage: `url(${movie ? imageUrl + movie.backdrop_path : ""})`,
      }}
      className="banner"
    >
      <div className="content">
        <h1 className="title">{movie ? movie.title || movie.name : ""}</h1>
        <div className="banner_buttons">
          <button className="button">play</button>
          <button className="button">My list</button>
        </div>
        <h1 className="description">{movie ? movie.overview : ""}</h1>
      </div>
      <div className="fadeBottom"></div>
    </div>
  );
}

export default Banner;
