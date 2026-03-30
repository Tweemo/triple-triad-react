import { useState } from 'react'
import './Board.css'
import cards from './cards.json'
import BoardCell from './BoardCell'
import Hand from './Hand'
import { getRandomNumbers } from './util'

const randomCards = getRandomNumbers()

const opponentHand = {
  user: 'Opponent',
  cards: [
    cards[randomCards[0]],
    cards[randomCards[1]],
    cards[randomCards[2]],
    cards[randomCards[3]],
    cards[randomCards[4]],
  ],
}

const playerHand = {
  user: 'Player',
  cards: [
    cards[randomCards[5]],
    cards[randomCards[6]],
    cards[randomCards[7]],
    cards[randomCards[8]],
    cards[randomCards[9]],
  ],
}

function Board() {
  const cells = []
  const [turn, setTurn] = useState('Player')

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      cells.push({ row: i, col: j })
    }
  }

  return (
    <div className="board">
      <Hand user={opponentHand.user} cards={opponentHand.cards} turn={turn} />
      <div className="field">
        {cells.map((cell) => {
          return <BoardCell cell={cell} key={`${cell.row}-${cell.col}`} />
        })}
      </div>
      <Hand user={playerHand.user} cards={playerHand.cards} turn={turn} />
    </div>
  )
}

export default Board
