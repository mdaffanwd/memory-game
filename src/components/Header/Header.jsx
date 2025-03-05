import React from 'react'

export default function Header({
    score = 0,
    bestScore = 0,
    totalCards = 12,
    onInput = () => { },
    resetBestScore = () => { } }) {

    function handleInput(e) {
        onInput(e.target.value);
    }

    return (
        <header className="header">
            <div className="details">
                <h1>Memory Tester Game.</h1>
                <p>Click on each image only once to increase the score.</p>
            </div>

            <div className="second-div">
                <div className="total-cards-input">
                    <label
                        htmlFor="total-cards">
                        Total Cards
                    </label>
                    <input
                        type="text"
                        id='total-cards'
                        value={totalCards}
                        onChange={handleInput}
                    />
                </div>

                <div className="scoreboard">
                    <p>Score: {score} </p>
                    <p>Best score: {bestScore} </p>
                    <button onClick={resetBestScore}>Reset Best Score</button>
                </div>
            </div>
        </header>
    )
}
