import { useEffect } from 'react'
import BoardCell from './BoardCell'
import useGameStateStore from '../store/gameState'

interface Cell {
  row: number
  col: number
}

function Field({ cells, isPlacing }: { cells: Cell[]; isPlacing: boolean }) {
  const { selectedCell, setSelectedCell } = useGameStateStore()

  useEffect(() => {
    if (isPlacing) {
      setSelectedCell({ row: 1, col: 1 })
    } else {
      setSelectedCell(null)
    }
  }, [isPlacing])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.preventDefault()

    if (!isPlacing) return

    const { row, col } = selectedCell || { row: 1, col: 1 }

    let newRow = row
    let newCol = col

    if (e.key === 'ArrowUp') {
      newRow = Math.max(0, row - 1)
    } else if (e.key === 'ArrowDown') {
      newRow = Math.min(2, row + 1)
    } else if (e.key === 'ArrowLeft') {
      newCol = Math.max(0, col - 1)
    } else if (e.key === 'ArrowRight') {
      newCol = Math.min(2, col + 1)
    }

    setSelectedCell({ row: newRow, col: newCol })
  }

  return (
    <div className="field" onKeyDown={handleKeyDown} tabIndex={0}>
      {cells.map((cell) => {
        return (
          <BoardCell
            cell={cell}
            selected={
              cell.row === selectedCell?.row && cell.col === selectedCell?.col
            }
            key={`${cell.row}-${cell.col}`}
          />
        )
      })}
    </div>
  )
}

export default Field
