import Card from './Card'
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
  selectedCardIndex,
}: {
  user: string
  cards: CardProps[]
  turn: string
  selectedCardIndex: number
}) {
  return (
    <div className={clsx('hand', user)}>
      <div className="cards">
        {cards.map((card, i) => (
          <Card
            style={{ top: `${130 * i}px` }}
            selected={i === selectedCardIndex}
            card={card}
            user={user}
            turn={turn}
            key={card.name}
          />
        ))}
      </div>
    </div>
  )
}

export default Hand
