import BoardCell from './BoardCell'

function Field({
  cells,
  isPlacing,
}: {
  cells: { row: number; col: number }[]
  isPlacing: boolean
}) {
  // Todo logic to keep track of where the card is being placed is here

  return (
    <div className="field">
      {cells.map((cell) => {
        return (
          <BoardCell
            cell={cell}
            isPlacing={isPlacing}
            key={`${cell.row}-${cell.col}`}
          />
        )
      })}
    </div>
  )
}

export default Field
