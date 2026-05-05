import './Board.css'
import Cursor from './Cursor'
import Card from './Card'
import type { CardProps } from './Hand'

interface BoardCell {
  row: number
  col: number
}

function BoardCell({
  selected,
  placedCard,
}: {
  selected: boolean
  placedCard?: CardProps | null
}) {
  return (
    <div className="cell">
      {selected && <Cursor />}
      {placedCard && (
        <Card
          selected={false}
          card={placedCard}
          user="player"
          style={{ top: 0, left: 0 }}
          className="field-placed"
        />
      )}
    </div>
  )
}

export default BoardCell
