import Cursor from './Cursor'
import clsx from 'clsx'
import type { CardProps } from './Hand'
import RankNumber from './RankNumber'
import './Card.css'

function Card({
  selected,
  card,
  user,
  turn,
  style,
}: {
  selected: boolean
  card: CardProps
  user: string
  turn: string
  style: React.CSSProperties
}) {
  return (
    <div
      className={clsx('card', selected && user === 'Player' && 'selected')}
      style={style}
    >
      {selected && user === 'Player' && <Cursor />}
      <div className="ranks">
        <RankNumber className="top" rank={card.top.toString()} />
        <RankNumber className="left" rank={card.left.toString()} />
        <RankNumber className="right" rank={card.right.toString()} />
        <RankNumber className="bottom" rank={card.bottom.toString()} />
      </div>
      <img key={card.name} src={card.file} alt={`Card ${card.name}`} />
    </div>
  )
}

export default Card
