import Card from './Card'
import { useState, useEffect, useRef } from 'react'
import './Hand.css'
import clsx from 'clsx'

export interface CardProps {
  file: string
  level: number
  name: string
  top: number
  right: number
  bottom: number
  left: number
  element: string | null
}

function Hand({
  user,
  cards,
  turn,
}: {
  user: string
  cards: CardProps[]
  turn: string
}) {
  const [selectedCardIndex, setSelectedCardIndex] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        setSelectedCardIndex((prev) => Math.max(0, prev - 1))
      } else if (e.key === 'ArrowDown') {
        setSelectedCardIndex((prev) => Math.min(4, prev + 1))
      }

      // TODO delay in playing the sound, should play even if spammed
      audioRef.current
        ?.play()
        .catch((e) => console.error('Audio play failed:', e))
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedCardIndex])

  return (
    <div className={clsx('hand', user)}>
      <div className="cards">
        {cards.map((card, i) => (
          <Card
            style={{ top: `${130 * i}px` }}
            selected={i === selectedCardIndex}
            card={card}
            key={card.name}
          />
        ))}
      </div>
      <audio ref={audioRef} src="/assets/sounds/select.wav" />
    </div>
  )
}

export default Hand
