import './Board.css'
import Cursor from './Cursor'

interface BoardCell {
  row: number
  col: number
}

function BoardCell({ cell, selected }: { cell: BoardCell; selected: boolean }) {
  return (
    <>
      <div className="cell" key={`${cell.row}-${cell.col}`}>
        {selected && <Cursor />}
        {cell.row},{cell.col}
      </div>
    </>
  )
}

export default BoardCell
