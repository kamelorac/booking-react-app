import React, { useState } from "react";
import { useEffect } from "react";
import "./Events.css";
import axios from "axios";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [tracks, setMusic] = useState([]);

  useEffect(() => {
    getAllEvents();
  }, []);

  async function getAllEvents() {
    let response = await axios.get("http://127.0.0.1:8000/api/events/");
    setEvents(response.data);
  }

  useEffect(() => {
    getAllMusic();
  }, []);

  async function getAllMusic() {
    let response = await axios.get("http://127.0.0.1:8000/api/music/");
    setMusic(response.data);
  }

  const [name, setName] = useState();
  const [address, setAddress] = useState();

  const addEvent = async() =>{
    console.log(name +"===" +address);
    // let response = await axios.post("http://127.0.0.1:8000/api/events/",{name, address});
    // setEvents([...events, response.data])
  }

  return (
    <div className="EventsPage">
      <div className="background-color"></div>
      <div className="events">
        <h3>Available Events :</h3>
        <div className="events_container">
          {events?.map((event, index) => (
            <div className="event-grid" key={index}>
              <h4 className="event_name">{event.name}</h4>
              <p className="event_address">{event.address}</p>
              <p className="event_date">{event.date}</p>
              <p className="event_time">{event.time}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="tracks">
        <h3>Available Top 5 Tracks :</h3>
        <div className="track_container">
          {tracks?.map((track, index) => (
            <div className="track" key={index}>
              <h4 className="track_title">{track.title}</h4>
              <p className="track_artist">{track.artist}</p>
              <p className="track_album">{track.album}</p>
              <p className="track_date">{track.release_date}</p>
              <p className="track_genre">{track.genre}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        
          <div className="cf">
            <input type="text" onChange={(e)=>setName(e.target.value)} placeholder="Name" value={name} name="user_name" />
            <input type="text" onChange={(e)=>setAddress(e.target.value)} placeholder="Email address" value={address} name="user_email" />
          </div>
          
          <button onClick={addEvent}>Add Event</button>
        
      </div>
    </div>
  );
};

export default Events;
