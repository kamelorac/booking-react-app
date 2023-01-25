import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import "./HomePage.css";
import axios from "axios";

const HomePage = (props) => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [cars, setCars] = useState([]);
  const [events, setEvents] = useState([]);
  const [queue, setQueue] = useState();

  const [name, setName] = useState();
  const [title, setTitle] = useState();
  const [artist, setArtist] = useState();
  const [genre, setGenre] = useState();
  const [loading, setLoading] = useState(false);

  const fetchQueue = async () => {
    try {
      let response = await axios.get("http://127.0.0.1:8000/api/djqueue/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log(response.data, "queue");
      setQueue(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    fetchQueue();
  }, [token]);

  const addQueue = async () => {
    try {
      let response = await axios.post("http://127.0.0.1:8000/api/djqueue/", {
        name,
        title,
        artist,
        genre,
      });
      setQueue([...queue, response.data]);
      setLoading(false);
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

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/events/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setEvents(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchEvents();
  }, [token]);
  console.log(events);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/cars/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setCars(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchCars();
  }, [token]);

  return (
    <>
      <div className="container">
        <div className="services-container">
          <div class="box">
            <br></br>
            <h2>SONG LIST</h2>
            <br></br>
            <h2>By Artist</h2>
            <br></br>
            <h2>By Genre</h2>
            <br></br>
            <h2>By Song Title</h2>
          </div>
          <div class="div">
            <span>Services Offered</span>
            <p>
              Wolfman Entertainment is a full service karaoke company servicing
              the north suburbs of Chicago. With over 60,000 songs in the
              collection and new ones added frequently, Brad Wolf hosts an
              entertaining evening. I added a top 5 song tracks on my events
              page for you to view.
            </p>
          </div>
        </div>
        <hr></hr>
        <div class="container-item">
          <div class="column">
            <h2>Music</h2>
            <p class="subtext">
              View the better books with many new songs!! Close to 60,000 unique
              songs to choose from. Let me know what your favorite brand is.
            </p>
          </div>
          <div class="column">
            <h2>Dancing</h2>
            <p class="subtext-1">
              There is plenty of dancing going on at Brads shows! With amazing
              lights, sound systems and energhy. Youll walk away satisified,
              happy and exhausted from the shaking going on!
            </p>
          </div>
          <div class="column">
            <h2>Cocktails</h2>
            <p class="subtext-2">
              Full bar anyone? Mixing the best drinks for you and your friends
              is just icing on the cake at Brads karaoke shows! You will have
              just enough liquid encouragement to get up on the stage and sing a
              song or two or atleast participate and shake those hips on the
              dance floor!
            </p>
          </div>
        </div>
      </div>
      <h2 class="karaoke">Karaoke</h2>
      <div class="flex-container">
        <img
          src="https://static.wixstatic.com/media/190aaf_fb14febb00b7488484ac5336bafe4d7e~mv2.jpg/v1/fill/w_700,h_700,al_c,q_85,enc_auto/ni%20lpgo.jpg"
          alt=""
        />

        <div>
          <p class="p">
            Neightborhood Inn is smoke free and has an awesome patio outdoors
            with seating for smokers. Karaoke is every Saturday at from
            9pm-12am.
            <br></br>
            Got questions?{" "}
            <a href="sms:18475309221" className="btn btn-warning">
              Text Us!
            </a>
            <br></br>
            Neighborhood Inn website:
            <a href="https://www.neighborhoodinn.com/home">Click Here!</a>
          </p>
          <table style={{ marginTop: "50px" }}>
            <tr>
              <th>Name</th>
              <th>Title</th>
              <th>Artist</th>
              <th>Genre</th>
            </tr>
            {queue?.map((que, index) => (
              <tr key={index}>
                <td class="td-content">{que.name}</td>
                <td class="td-content">{que.title}</td>
                <td class="td-content">{que.artist}</td>
                <td class="td-content">{que.genre}</td>
                {user && user.id === 1 && (
                  <td class="td-content">
                    <button onClick={() => removeQueue(que.id)}>Remove</button>
                  </td>
                )}
              </tr>
            ))}
            {user && loading == true && (
              <tr style={{ paddingTop: "50px" }}>
                <td class="td-content">{name}</td>
                <td class="td-content">{title}</td>
                <td class="td-content">{artist}</td>
                <td class="td-content">{genre}</td>
                <td class="td-content">waiting</td>
                {user.id === 1 && (
                  <td class="td-content">
                    <button onClick={addQueue}>complete</button>
                  </td>
                )}
              </tr>
            )}
            {user && (
              <tr>
                <td class="td-content">
                  <input
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    name="queue_name"
                  />
                </td>
                <td class="td-content">
                  <input
                    type="text"
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    name="queue_title"
                  />
                </td>
                <td class="td-content">
                  <input
                    type="text"
                    placeholder="Artist"
                    onChange={(e) => setArtist(e.target.value)}
                    value={artist}
                    name="queue_artist"
                  />
                </td>
                <td class="td-content">
                  <input
                    type="text"
                    placeholder="Genre"
                    onChange={(e) => setGenre(e.target.value)}
                    value={genre}
                    name="queue_genre"
                  />
                </td>
                <td class="td-content">
                  <button onClick={() => setLoading(true)}>
                    Request Queue
                  </button>
                </td>
              </tr>
            )}
          </table>
        </div>
      </div>
      <h2 class="about">About Brad</h2>
      <br></br>
      <div class="info">
        <span>
          I am a KJ in the Chicago north suburbs for the last 8 years. I have a
          large selection of songs to sing in many brands. I use Compuhost
          Karaoke. I frequently update both old and new, legal downloads, always
          expanding my repertoize of songs for you to enjoy senging. I have
          hosted at many of the chicago bars and i do some private parties as
          well. My goal as a Karaoke Host is to make everyone feel happier and,
          better about themselves!{" "}
        </span>
      </div>
    </>
  );
};

export default HomePage;
