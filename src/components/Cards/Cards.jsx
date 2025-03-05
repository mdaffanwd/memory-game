import React from 'react'
import Card from '../Card.jsx'


export default function Cards({
    cards = [],
    handleCardClick = () => { },
}) {



    return (
        <div className="cards">
            {cards.map(card => (
                <Card key={card.id} src={card.image} pokeName={card.name} onClick={handleCardClick(card.id)} />
            ))}
        </div>
    )
}
