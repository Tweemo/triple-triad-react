import Cursor from './Cursor'
import clsx from 'clsx'
import type { CardProps } from './Hand'
import RankNumber from './RankNumber'
import './Card.css'

function Card({
  selected,
  card,
  user,
  style,
  className,
}: {
  selected: boolean
  card: CardProps
  user: string
  style: React.CSSProperties
  className?: string
}) {
  return (
    <div
      className={clsx(
        'card',
        `${user}-card`,
        className,
        selected && user === 'player' && 'selected',
      )}
      style={style}
    >
      {selected && user === 'player' && <Cursor />}
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
