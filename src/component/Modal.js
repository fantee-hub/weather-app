import React from "react";
import styled from "styled-components";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { popUp } from "../component/animate";

const Modal = ({ toggle, setToggle, setWeatherData, input, setInput }) => {
  const API_KEY = "8a2a9bdae8ca48c29cd204847210706";
  const base_url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${input}`;

  const exitModal = (e) => {
    e.preventDefault();
    setToggle(!toggle);
  };

  const getTextInput = (e) => {
    setInput(e.target.value);
  };

  const changeLocation = (e) => {
    e.preventDefault();
    setInput("");

    axios
      .get(base_url)
      .then((data) => {
        setWeatherData(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <AnimatePresence>
        {toggle && (
          <ModalCard
            key="modal"
            variants={popUp}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <form className="modal">
              <input
                type="text"
                placeholder="Location"
                onChange={getTextInput}
                value={input}
              />
              <button type="submit" onClick={changeLocation}>
                Change
              </button>
              <button onClick={exitModal}>Close</button>
            </form>
          </ModalCard>
        )}
      </AnimatePresence>
    </>
  );
};

const ModalCard = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: rgba(0, 0, 0, 0.6);

  .modal {
    background: #202020;
    padding: 3rem;
    border-radius: 0.7rem;
    color: white;
    @media screen and (max-width: 700px) {
      display: grid;
      grid-template-rows: 1fr 1fr;
      grid-row-gap: 0.4rem;
    }
  }
  input {
    box-shadow: inset 6px 6px 8px 0 rgba(0, 0, 0, 0.2),
      inset -6px -6px 6px 0 rgba(255, 255, 255, 0.1);
    border: none;
    background: #202020;
    padding: 0.8rem;
    color: white;
    border-radius: 0.3rem;
    text-transform: capitalize;
    letter-spacing: 0.1rem;
    font-weight: bold;
    &:focus {
      outline: none;
    }
  }
  button {
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 0.3rem;
    margin-left: 0.7rem;
    cursor: pointer;
    font-family: "Poppins", sans-serif;
    @media screen and (max-width: 700px) {
      margin-top: 0.7rem;
      margin-left: 0;
    }
  }
`;

export default Modal;
