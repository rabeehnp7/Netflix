import axios from '../../constants/axios'
import { API_KEY,imageURL } from '../../constants/constants'
import React, { useEffect, useState } from 'react'
import './rowCards.css'
import YouTube from 'react-youtube'
function Cards(props) {
  const [action, setAction] = useState([])
  const [trailer, settrailer] = useState('')
  useEffect(() => {
    axios.get(props.url).then((Response)=>{
      setAction(Response.data.results)
    })
  }, [])
  const playTrailer=(id)=>{
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}`).then((Response)=>{
      settrailer(Response.data.results[0])
    })
  }
  const opts = {
    height: '390',
    width: '100%',
  }
  return (
    <div className='row'>
      <h1 className='title'>{props.title}</h1>
      <div className='posters'>
        {
          action.map((obj)=>{
            return(
              <img onClick={()=>{playTrailer(obj.id)}} className={props.isSmall?'smallPoster':'poster'} alt='poster' src={`${imageURL}${obj.backdrop_path}`} ></img>
            )
          })
        }
      </div>
      <div>
      { trailer && <YouTube videoId={trailer.key} opts={opts}/>}
      </div>
    </div>
  )
}

export default Cards