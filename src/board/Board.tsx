import { useState, useRef, useEffect } from 'react'
import './Board.css'
import cards from './cards.json'
import Field from './Field'
import Hand from './Hand'
import { getRandomNumbers } from './util'
import useGameStateStore from '../store/gameState'

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
  const [turn, setTurn] = useState('Opponent')

  const {
    selectedCardIndex,
    isCardSelected,
    setSelectedCardIndex,
    setIsCardSelected,
    selectedCell,
  } = useGameStateStore()

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      cells.push({ row: i, col: j })
    }
  }

  const audioRef = useRef<HTMLAudioElement>(null)

  const handleKeyDown = (e: KeyboardEvent) => {
    // Handle navigating cards
    if (e.key === 'ArrowUp' && !isCardSelected) {
      setSelectedCardIndex(Math.max(0, selectedCardIndex - 1))
    } else if (e.key === 'ArrowDown' && !isCardSelected) {
      setSelectedCardIndex(Math.min(4, selectedCardIndex + 1))
    }

    // Handle selecting a card
    if (e.key === 'Enter') {
      if (!isCardSelected) {
        console.log(
          `Selected card: ${playerHand.cards[selectedCardIndex].name}`,
        )
        setIsCardSelected(true)
      } else {
        // @todo add logic to place the card here, for now just log the selected cell
        console.log(
          `I want to place this card on tile ${selectedCell?.row}, ${selectedCell?.col}`,
        )
        setIsCardSelected(false) // Deselect the card after "placing" it
        // @todo, then it will become the opponent's turn, where a random card will be chosen and placed on a random tile
      }
    }

    if (e.key === 'Escape' && isCardSelected) {
      console.log(
        `${playerHand.cards[selectedCardIndex].name} has been deselected`,
      )
      setIsCardSelected(false)
    }

    // TODO delay in playing the sound, should play even if spammed
    audioRef.current
      ?.play()
      .catch((e) => console.error('Audio play failed:', e))
  }

  // Todo may be a more graceful way to handle this, but it works for now
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  return (
    <div className="board">
      {/* Todo Probably need to create a separate component for the opponent's hand */}
      <Hand
        user={opponentHand.user}
        cards={opponentHand.cards}
        turn={turn}
        selectedCardIndex={selectedCardIndex}
      />
      <Field cells={cells} isPlacing={isCardSelected} />
      <Hand
        user={playerHand.user}
        cards={playerHand.cards}
        turn={turn}
        selectedCardIndex={selectedCardIndex}
      />
      <audio ref={audioRef} src="/assets/sounds/select.wav" />
    </div>
  )
}

export default Board
