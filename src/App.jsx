import React, { useEffect, useState } from 'react'
import './style.css'
import Card from './components/Card.jsx';
import Header from './components/Header/Header.jsx';
import Cards from './components/Cards/Cards.jsx';

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function App() {

  const [cards, setCards] = useState([]);
  const [totalCards, setTotalCards] = useState(12)
  const [clickedCardsIds, setClickedCardsIds] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => Number(localStorage.getItem('bestScore')) || 0);


  function handleInput(value) {
    setTotalCards(value)
  }

  function handleCardClick(id) {
    return function () {
      if (clickedCardsIds.includes(id)) {
        alert("You already clicked this card. Game over! \n Your score is: " + score);
        setClickedCardsIds([])
        setScore(0)
        if (score > bestScore) {
          setBestScore(score);
        }
      } else {
        const newClickedCardId = [...clickedCardsIds, id];
        setClickedCardsIds(newClickedCardId);
        setScore(score + 1);

        // shuffle cards on every click
        handleCardsShuffle();
      }
    }
  }

  function handleCardsShuffle() {
    setCards(shuffleArray(cards));
  }

  const resetBestScore = () => {
    setBestScore(0);
  };

  // for fetching cards from pokeapi.
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${totalCards}`)
      .then(data => data.json())

      .then(data => {
        const allPokeUrls = data.results.map(poke => fetch(poke.url)
          .then(res => res.json())
        );

        Promise.all(allPokeUrls).then(details => {
          const cardsData = details.map(detail => ({
            id: detail.id,
            name: detail.name,
            image: detail.sprites.front_default
          }));
          setCards(cardsData);
        });
        // console.log(cards)
      })
  }, [totalCards])

  // for setting best score in local storage.
  useEffect(() => {
    localStorage.setItem('bestScore', bestScore);
  }, [bestScore])

  return (
    <div className='container'>

      <Header
        score={score}
        bestScore={bestScore}
        totalCards={totalCards}
        onInput={handleInput}
        setTotalCards={setTotalCards}
        resetBestScore={resetBestScore}
      />
      <p className='credit'>Coded by <a href="https://x.com/mdaffan_codes" target='_blank' >Mohammad Affan</a> with 💖</p>
      <main>
        <Cards
          cards={cards}
          totalCards={totalCards}
          setCards={setCards}
          handleCardClick={handleCardClick}
        />
      </main>
    </div>
  )
}
