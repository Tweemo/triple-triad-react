import { useState, useRef, useEffect } from 'react'
import cards from './cards.json'
import Field from './Field'
import Hand from './Hand'
import type { CardProps } from './Hand'
import { getRandomNumbers } from './util'
import useGameStateStore from '../store/gameState'
import './Board.css'

const randomCards = getRandomNumbers()

const opponentHand = {
  user: 'opponent',
  cards: [
    cards[randomCards[0]],
    cards[randomCards[1]],
    cards[randomCards[2]],
    cards[randomCards[3]],
    cards[randomCards[4]],
  ],
}

const playerHand = {
  user: 'player',
  cards: [
    cards[randomCards[5]],
    cards[randomCards[6]],
    cards[randomCards[7]],
    cards[randomCards[8]],
    cards[randomCards[9]],
  ],
}

const INITIAL_SCORE = 5

function Board() {
  const cells = []
  const [turn] = useState('Opponent')
  const [playerCards, setPlayerCards] = useState<CardProps[]>([
    ...playerHand.cards,
  ])
  const [fieldPlacements, setFieldPlacements] = useState<
    Record<string, CardProps>
  >({})

  const {
    selectedCardIndex,
    isCardSelected,
    setSelectedCardIndex,
    setIsCardSelected,
    selectedCell,
    setSelectedCell,
  } = useGameStateStore()

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      cells.push({ row: i, col: j })
    }
  }

  const audioRef = useRef<HTMLAudioElement>(null)

  const handleKeyDown = (e: KeyboardEvent) => {
    // Handle navigating cards
    const maxHandIndex = Math.max(0, playerCards.length - 1)

    if (e.key === 'ArrowUp' && !isCardSelected) {
      setSelectedCardIndex(Math.max(0, selectedCardIndex - 1))
    } else if (e.key === 'ArrowDown' && !isCardSelected) {
      setSelectedCardIndex(Math.min(maxHandIndex, selectedCardIndex + 1))
    }

    // Handle navigating field
    if (isCardSelected) {
      const { row, col } = selectedCell || { row: 1, col: 1 }

      let newRow = row
      let newCol = col

      if (e.key === 'ArrowUp') {
        newRow = Math.max(0, row - 1)
      } else if (e.key === 'ArrowDown') {
        newRow = Math.min(2, row + 1)
      } else if (e.key === 'ArrowLeft') {
        newCol = Math.max(0, col - 1)
      } else if (e.key === 'ArrowRight') {
        newCol = Math.min(2, col + 1)
      }

      setSelectedCell({ row: newRow, col: newCol })
    }

    // Handle placing a card
    if (e.key === 'Enter') {
      if (!isCardSelected) {
        const card = playerCards[selectedCardIndex]
        if (!card) return
        console.log(`Selected card: ${card.name}`)
        setIsCardSelected(true)
      } else {
        const row = selectedCell?.row
        const col = selectedCell?.col
        if (row === undefined || col === undefined) return

        const cellKey = `${row}-${col}`
        if (fieldPlacements[cellKey]) {
          console.log(`Cell ${cellKey} is already occupied`)
          return
        }

        const card = playerCards[selectedCardIndex]
        if (!card) return

        setFieldPlacements((prev) => ({ ...prev, [cellKey]: card }))
        setPlayerCards((prev) => prev.filter((_, i) => i !== selectedCardIndex))
        const nextMaxIndex = Math.max(0, playerCards.length - 2)
        setSelectedCardIndex(Math.min(selectedCardIndex, nextMaxIndex))
        setIsCardSelected(false)
        // @todo: opponent turn — random card on random tile
      }
    }

    if (e.key === 'Escape' && isCardSelected) {
      const card = playerCards[selectedCardIndex]
      if (card) {
        console.log(`${card.name} has been deselected`)
      }
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
        selectedCardIndex={selectedCardIndex}
        score={INITIAL_SCORE}
      />
      <Field
        cells={cells}
        isPlacing={isCardSelected}
        placements={fieldPlacements}
      />
      <Hand
        user={playerHand.user}
        cards={playerCards}
        selectedCardIndex={selectedCardIndex}
        score={INITIAL_SCORE}
      />
      <audio ref={audioRef} src="/assets/sounds/select.wav" />
    </div>
  )
}

export default Board
