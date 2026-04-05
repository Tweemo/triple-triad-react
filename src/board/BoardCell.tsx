import './Board.css'
import Cursor from './Cursor'

interface BoardCell {
  row: number
  col: number
}

function BoardCell({
  cell,
  isPlacing,
}: {
  cell: BoardCell
  isPlacing: boolean
}) {
  return (
    <>
      <div className="cell" key={`${cell.row}-${cell.col}`}>
        {isPlacing && <Cursor />}
        {cell.row},{cell.col}
      </div>
    </>
  )
}

export default BoardCell
