import React, { useState } from "react";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import "./Events.css";
import axios from "axios";
import { resolvePath } from "react-router-dom";

const Events = () => {
  const [user, token] = useAuth();
  const [events, setEvents] = useState([]);
  const [tracks, setMusic] = useState([]);

  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();

  const [title, setTitle] = useState();
  const [artist, setArtist] = useState();
  const [album, setAlbum] = useState();
  const [genre, setGenre] = useState();
  const [release_date, setRelease_date] = useState();

  const Track = ({ track }) => {
    const [editing, setEditing] = useState(false);
    const [title1, setTitle1] = useState();
    const [artist1, setArtist1] = useState();
    const [album1, setAlbum1] = useState();
    const [release_date1, setRelease_date1] = useState();
    const [genre1, setGenre1] = useState();
    const editTrack = async (id) => {
      try {
        console.log(id);
        await axios.put(`http://127.0.0.1:8000/api/music/${id}/`, {
          title1,
          artist1,
          album1,
          genre1,
          release_date1,
        });
        setEditing(false);
        getAllMusic();
      } catch (error) {
        console.log(error.response.data);
      }
    };

    const removeTrack = async (id) => {
      try {
        console.log(id);
        let response = await axios.delete(
          `http://127.0.0.1:8000/api/music/${id}/`
        );
        getAllMusic();
      } catch (error) {
        console.log(error.response.data);
      }
    };

    return (
      <div className="track">
        <h4 className="track_title">{track.title}</h4>
        <p className="track_artist">{track.artist}</p>
        <p className="track_album">{track.album}</p>
        <p className="track_date">{track.release_date}</p>
        <p className="track_genre">{track.genre}</p>
        {user && user.id === 1 && (
          <div>
            {!editing && <button onClick={() => setEditing(true)}>Edit</button>}
            {editing && (
              <div>
                <input
                  type="text"
                  placeholder="Title"
                  onChange={(e) => setTitle1(e.target.value)}
                  value={title1}
                  name="track_title"
                />
                <input
                  type="text"
                  placeholder="Artist"
                  onChange={(e) => setArtist1(e.target.value)}
                  value={artist1}
                  name="track_artist"
                />
                <input
                  type="text"
                  placeholder="Album"
                  onChange={(e) => setAlbum1(e.target.value)}
                  value={album1}
                  name="track_album"
                />
                <input
                  type="text"
                  placeholder="Genre"
                  onChange={(e) => setGenre1(e.target.value)}
                  value={genre1}
                  name="track_genre"
                />
                <input
                  type="date"
                  placeholder="Date"
                  onChange={(e) => setRelease_date1(e.target.value)}
                  value={release_date1}
                  name="track_release_date"
                />
                <button onClick={() => editTrack(track.id)}>Save</button>
              </div>
            )}
            <button onClick={() => removeTrack(track.id)}>Delete</button>
          </div>
        )}
      </div>
    );
  };

  const Event = ({ event }) => {
    const [editing, setEditing] = useState(false);
    const [name1, setName1] = useState();
    const [address1, setAddress1] = useState();
    const [date1, setDate1] = useState();
    const [time1, setTime1] = useState();
    const editEvent = async (id) => {
      try {
        console.log(id);
        await axios.put(`http://127.0.0.1:8000/api/events/${id}/`, {
          name1,
          address1,
          date1,
          time1,
        });
        setEditing(false);
        getAllEvents();
      } catch (error) {
        console.log(error.response.data);
      }
    };

    const removeEvent = async (id) => {
      try {
        console.log(id);
        let response = await axios.delete(
          `http://127.0.0.1:8000/api/events/${id}/`
        );
        getAllEvents();
      } catch (error) {
        console.log(error.response.data);
      }
    };

    const removeQueue = async (id) => {
      try {
        console.log(id);
        let response = await axios.delete(
          `http://127.0.0.1:8000/api/djqueue/${id}/`
        );
        fetchQueue();
      } catch (error) {
        console.log(error.response.data);
      }
    };

    return (
      <div className="event-grid">
        <h4 className="event_name">{event.name}</h4>
        <p className="event_address">{event.address}</p>
        <p className="event_date">{event.date}</p>
        <p className="t_time">{event.time}</p>
        {user && user.id === 1 && (
          <div>
            {!editing && <button onClick={() => setEditing(true)}>Edit</button>}
            {editing && (
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  onChange={(e) => setName1(e.target.value)}
                  value={name1}
                  name="event_name"
                />
                <input
                  type="text"
                  placeholder="address"
                  onChange={(e) => setAddress1(e.target.value)}
                  value={address1}
                  name="event_address"
                />
                <input
                  type="date"
                  placeholder="date"
                  onChange={(e) => setDate1(e.target.value)}
                  value={date1}
                  name="event_date"
                />
                <input
                  type="time"
                  placeholder="time"
                  onChange={(e) => setTime1(e.target.value)}
                  value={time1}
                  name="event_time"
                />
                <button onClick={() => editEvent(event.id)}>Save</button>
              </div>
            )}
            <button onClick={() => removeEvent(event.id)}>Delete</button>
          </div>
        )}
      </div>
    );
  };

  const addEvent = async () => {
    let response = await axios.post("http://127.0.0.1:8000/api/events/", {
      name,
      address,
      date,
      time,
    });
    setEvents([...events, response.data]);
  };

  const addTrack = async () => {
    let response = await axios.post("http://127.0.0.1:8000/api/music/", {
      title,
      artist,
      album,
      genre,
      release_date,
    });
    setMusic([...tracks, response.data]);
    // console.log(response.data);
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  async function getAllEvents() {
    let response = await axios.get("http://127.0.0.1:8000/api/events/");
    setEvents(response.data);
    console.log(response.data);
  }

  useEffect(() => {
    getAllMusic();
  }, []);

  async function getAllMusic() {
    let response = await axios.get("http://127.0.0.1:8000/api/music/");
    setMusic(response.data);
  }

  return (
    <div className="EventsPage">
      <div className="background-color"></div>
      <div className="events">
        <h3>Available Events :</h3>
        <div className="events_container">
          {events?.map((event, index) => (
            <Event event={event} key={index} />
          ))}
        </div>
      </div>
      <div className="tracks">
        <h3>Available Top 5 Tracks :</h3>
        <div className="track_container">
          {tracks?.map((track, index) => (
            <Track track={track} key={index} />
          ))}
        </div>
        {user && user.id === 1 && (
          <div>
            <div>
              <div className="cf">
                <input
                  type="text"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  name="event_name"
                />
                <input
                  type="text"
                  placeholder="address"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                  name="event_address"
                />
                <input
                  type="date"
                  placeholder="date"
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                  name="event_date"
                />
                <input
                  type="time"
                  placeholder="time"
                  onChange={(e) => setTime(e.target.value)}
                  value={time}
                  name="event_time"
                />
              </div>
              <button onClick={addEvent}>Add Events</button>
            </div>
            <div>
              <div className="cf">
                <input
                  type="text"
                  placeholder="Title"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  name="track_title"
                />
                <input
                  type="text"
                  placeholder="Artist"
                  onChange={(e) => setArtist(e.target.value)}
                  value={artist}
                  name="track_artist"
                />
                <input
                  type="text"
                  placeholder="Album"
                  onChange={(e) => setAlbum(e.target.value)}
                  value={album}
                  name="track_album"
                />
                <input
                  type="text"
                  placeholder="Genre"
                  onChange={(e) => setGenre(e.target.value)}
                  value={genre}
                  name="track_genre"
                />
                <input
                  type="date"
                  placeholder="Date"
                  onChange={(e) => setRelease_date(e.target.value)}
                  value={release_date}
                  name="track_release_date"
                />
              </div>
              <button onClick={addTrack}>Add Track</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
