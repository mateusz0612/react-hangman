import React, { useState, useEffect } from "react";
import { GiBowman } from "react-icons/gi";
import data from "./data";
import letters from "./letters";
import "./style.css";

const Hangman = () => {
  const [wordObject, setWordObject] = useState({});
  const [guessWord, setGuessWord] = useState([]);
  const [lives, setLives] = useState(9);
  const [isHintShowed, setIsHintShowed] = useState(false);
  const [isGameOver, setGameOver] = useState(false);
  const [isGameWon, setGameWon] = useState(false);

  const showWord = () => {
    const newWord = wordObject.word.split("").map((letter) => letter);
    setGuessWord(newWord);
  };

  const checkForWin = (word) => {
    if (!word.includes("_")) setGameWon(true);
  };

  const checkForLose = () => {
    if (lives === 0) {
      showWord();
      setGameOver(true);
    }
  };

  const checkForMatch = (letter) => {
    if (wordObject.word.includes(letter) && lives >= 0 && !isGameOver) {
      const newWord = guessWord.map((letter) => letter);
      wordObject.word.split("").forEach((element, index) => {
        if (element === letter) newWord[index] = letter;
      });
      checkForWin(newWord);
      setGuessWord(newWord);
    } else {
      setLives((lastState) => {
        if (!isGameWon) {
          if (lastState !== 0) return lastState - 1;
          checkForLose();
        }
        return lastState;
      });
    }
  };

  const startNewGame = () => {
    const index = Math.floor(Math.random() * data.length);
    setWordObject(data[index]);
    const wordToGuess = data[index].word.split("").map(() => "_");
    setGuessWord(wordToGuess);
    setLives(9);
    setGameWon(false);
    setGameOver(false);
    setIsHintShowed(false);
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const { word, category, hint } = wordObject;

  return (
    <section className="main">
      <h1>
        <GiBowman />
        Hangman!
      </h1>
      <div className="wrapper">
        {letters.map((letter, index) => {
          return (
            <div
              className="letter"
              key={index}
              onClick={() => {
                checkForMatch(letter);
              }}
            >
              {letter}
            </div>
          );
        })}
      </div>
      <div className="container">
        <h3>Category: {category}</h3>
        {isHintShowed ? <p>Hint: {hint}</p> : ""}
        <button
          onClick={() => {
            setIsHintShowed(!isHintShowed);
          }}
          className="primary_button"
        >
          {isHintShowed ? "Hide hint" : "Show hint"}
        </button>
      </div>
      <div className="game_info">
        {isGameOver ? <h3>You lost! The word was {word}</h3> : ""}
        {isGameWon ? <h3>You guessed the word! Congratz!</h3> : ""}
      </div>
      <div className="word">
        {guessWord.map((element, index) => {
          return (
            <p key={index} className="word_element">
              {element}
            </p>
          );
        })}
      </div>
      <div className="lives">
        <h3>You have: {lives} lives</h3>
      </div>
      <button className="primary_button" onClick={startNewGame}>
        Start new game
      </button>
    </section>
  );
};

export default Hangman;
