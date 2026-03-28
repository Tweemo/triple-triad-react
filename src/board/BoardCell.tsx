import './Board.css'

interface BoardCell {
  row: number
  col: number
}

function BoardCell({ cell }: { cell: BoardCell }) {
  return (
    <div className="cell" key={`${cell.row}-${cell.col}`}>
      {cell.row},{cell.col}
    </div>
  )
}

export default BoardCell
