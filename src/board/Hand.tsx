import Card from './Card'
import './Hand.css'
import clsx from 'clsx'
import ScoreNumber from './ScoreNumber'

export interface CardProps {
  file: string
  level: number | string
  name: string
  top: number | string
  right: number | string
  bottom: number | string
  left: number | string
  element: string | null
}

function Hand({
  user,
  cards,
  turn,
  selectedCardIndex,
  score,
}: {
  user: string
  cards: CardProps[]
  turn: string
  selectedCardIndex: number
  score: number
}) {
  return (
    <div>
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
      <ScoreNumber score={score} />
    </div>
  )
}

export default Hand
