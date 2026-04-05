import Cursor from './Cursor'
import clsx from 'clsx'
import type { CardProps } from './Hand'
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
        <div className="top">{card.top}</div>
        <div className="left">{card.left}</div>
        <div className="right">{card.right}</div>
        <div className="bottom">{card.bottom}</div>
      </div>
      <img key={card.name} src={card.file} alt={`Card ${card.name}`} />
    </div>
  )
}

export default Card
