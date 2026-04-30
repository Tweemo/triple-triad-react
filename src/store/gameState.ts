import { create } from 'zustand'

interface GameState {
  selectedCardIndex: number,
  selectedCell: { row: number, col: number } | null,
  isCardSelected: boolean,
  setSelectedCardIndex: (index: number) => void,
  setSelectedCell: (cell: { row: number, col: number } | null) => void,
  setIsCardSelected: (selected: boolean) => void,
}

const useGameStateStore = create<GameState>((set) => ({
  selectedCardIndex: 0,
  selectedCell: null,
  isCardSelected: false,
  setSelectedCardIndex: (index) => set({ selectedCardIndex: index }),
  setSelectedCell: (cell) => set({ selectedCell: cell }),
  setIsCardSelected: (selected) => set({ isCardSelected: selected }),
}))

export default useGameStateStore