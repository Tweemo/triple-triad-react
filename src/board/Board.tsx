import { useState, useRef, useEffect } from 'react'
import './Board.css'
import cards from './cards.json'
import Field from './Field'
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
  const [selectedCardIndex, setSelectedCardIndex] = useState(0)
  const [cardSelected, setCardSelected] = useState(false)
  const [placingCard, setPlacingCard] = useState(false)

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      cells.push({ row: i, col: j })
    }
  }

  const audioRef = useRef<HTMLAudioElement>(null)

  const handleKeyDown = (e: KeyboardEvent) => {
    // Handle navigating cards
    if (e.key === 'ArrowUp' && !cardSelected) {
      setSelectedCardIndex((prev) => Math.max(0, prev - 1))
    } else if (e.key === 'ArrowDown' && !cardSelected) {
      setSelectedCardIndex((prev) => Math.min(4, prev + 1))
    }

    // Handle selecting a card
    if (e.key === 'Enter') {
      console.log(`Selected card: ${playerHand.cards[selectedCardIndex].name}`)
      setCardSelected(true)

      setPlacingCard(true)
    }

    if (e.key === 'Escape' && cardSelected) {
      console.log(
        `${playerHand.cards[selectedCardIndex].name} has been deselected`,
      )
      setCardSelected(false)
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
      <Field cells={cells} isPlacing={placingCard} />
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
