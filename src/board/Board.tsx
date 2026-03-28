import './Board.css'
import BoardCell from './BoardCell'
import Hand from './Hand'
import { getRandomNumbers } from './util'

const randomCards = getRandomNumbers()

const opponentHand = {
  user: 'Opponent',
  cards: [
    randomCards[0],
    randomCards[1],
    randomCards[2],
    randomCards[3],
    randomCards[4],
  ],
}

const playerHand = {
  user: 'Player',
  cards: [
    randomCards[5],
    randomCards[6],
    randomCards[7],
    randomCards[8],
    randomCards[9],
  ],
}

function Board() {
  const size = 3

  const cells = []
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      cells.push({ row: i, col: j })
    }
  }

  return (
    <div className="board">
      <Hand {...opponentHand} />
      <div className="field">
        {cells.map((cell) => {
          return <BoardCell cell={cell} key={`${cell.row}-${cell.col}`} />
        })}
      </div>
      <Hand {...playerHand} />
    </div>
  )
}

export default Board
