import { useEffect } from 'react'
import BoardCell from './BoardCell'
import useGameStateStore from '../store/gameState'
import type { CardProps } from './Hand'

interface Cell {
  row: number
  col: number
}

function Field({
  cells,
  isPlacing,
  placements,
}: {
  cells: Cell[]
  isPlacing: boolean
  placements: Record<string, CardProps>
}) {
  const { selectedCell, setSelectedCell } = useGameStateStore()

  useEffect(() => {
    if (isPlacing) {
      setSelectedCell({ row: 1, col: 1 })
    } else {
      setSelectedCell(null)
    }
  }, [isPlacing])

  return (
    <div className="field">
      {cells.map((cell) => {
        const key = `${cell.row}-${cell.col}`
        return (
          <BoardCell
            placedCard={placements[key]}
            selected={
              cell.row === selectedCell?.row && cell.col === selectedCell?.col
            }
            key={key}
          />
        )
      })}
    </div>
  )
}

export default Field
