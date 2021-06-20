import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Modal from "../component/Modal";

const Weather = () => {
  const API_KEY = "8a2a9bdae8ca48c29cd204847210706";
  const base_url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=lagos`;
  const [weatherData, setWeatherData] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    axios
      .get(base_url)
      .then((data) => {
        setWeatherData(data.data);
        console.log(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [base_url]);

  const toggleModal = () => {
    setToggle(!toggle);
  };

  return (
    <div>
      <Modal
        toggle={toggle}
        setToggle={setToggle}
        input={input}
        setInput={setInput}
        weatherData={weatherData}
        setWeatherData={setWeatherData}
      />
      {weatherData && (
        <Card>
          <h1>{weatherData.location.name}</h1>
          <p>{weatherData.location.country}</p>
          <div className="temp">
            <p>
              <span>{weatherData.current.temp_c}&deg;C</span>
            </p>
            <img src={weatherData.current.condition.icon} alt="weather icon" />
            <p>{weatherData.current.condition.text}</p>
          </div>
          <div className="others">
            <h1>
              <span>Humidity : </span>
              {weatherData.current.humidity}
            </h1>
            <h1>
              <span> Feels Like : </span>
              {weatherData.current.feelslike_c}&deg;C
            </h1>
          </div>
          <button onClick={toggleModal}>Change Location</button>
        </Card>
      )}
    </div>
  );
};

const Card = styled.div`
  background: #202020;
  color: #d4d4d4;
  min-width: 40%;
  margin: 0 auto;
  padding: 3rem;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 12px 12px 16px 0 rgba(0, 0, 0, 0.25),
    -8px -8px 12px 0 rgba(255, 255, 255, 0.3);
  border-radius: 3rem;

  button {
    background: #202020;
    box-shadow: 10px 10px 10px 0 rgba(0, 0, 0, 0.15),
      -6px -6px 8px 0 rgba(255, 255, 255, 0.2);
    border: none;
    cursor: pointer;
    color: white;
    font-family: "Poppins", sans-serif;
    padding: 1rem 2rem;
    font-size: 1rem;
    margin-top: 1rem;

    &:focus {
      box-shadow: inset 6px 6px 8px 0 rgba(0, 0, 0, 0.2),
        inset -6px -6px 6px 0 rgba(255, 255, 255, 0.1);
      transition: all 5s ease;
    }
  }
  img {
    width: 10rem;
    height: 10rem;
  }
  @media screen and (max-width: 700px) {
    min-width: 80%;
    padding: 0.2rem;
    p {
      font-size: 0.8rem;
    }
    .others {
      h1 {
        font-size: 1rem;
        font-weight: lighter;
      }
    }
    button {
      padding: 0.6rem 1.6rem;
      margin-bottom: 1.4rem;
    }
  }
`;

export default Weather;
