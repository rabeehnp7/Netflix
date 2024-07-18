import React, { useEffect, useState } from "react";
import "./Rowpost.css";
import axios from "../../Axios";
import { imageUrl, ApiKey, baseUrl } from "../../constants/Constants";
import Youtube from "react-youtube";

function Rowpost({ title, clas, url }) {
  const [posts, setPosts] = useState([]);
  const [videoKey, setVideoKey] = useState("");
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        console.log(response.data.results);
        setPosts(response.data.results);
      })
      .catch((error) => {
        console.error("error fetching data", error);
      });
  }, []);
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  const MovieClick = (id) => {
    console.log(id);
    axios
      .get(`movie/${id}/videos?api_key=${ApiKey}&language=en-US`)
      .then((response) => {
        console.log(response.data);
        if (response.data.results.length !== 0) {
          setVideoKey(response.data.results[0].key);
        } else {
          console.log("no trailers available");
        }
      });
  };
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="posters">
        {posts.map((item, index) => {
          return (
            <img
              onClick={() => MovieClick(item.id)}
              key={index}
              className={clas}
              src={imageUrl + item.backdrop_path}
              alt=""
            />
          );
        })}
      </div>
      {videoKey && <Youtube videoId={videoKey} opts={opts} />}
    </div>
  );
}

export default Rowpost;
