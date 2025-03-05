import React from 'react'

export default function Card({ src = '', pokeName = "", onClick = () => { } }) {
    return (
        <div className='card' onClick={onClick} >
            <img src={src} alt={pokeName} />
            <p>{pokeName}</p>
        </div>
    )
}

