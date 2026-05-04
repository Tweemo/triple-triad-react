import { useEffect, useState } from 'react'
import {
  loadBitmapFont,
  type FontData,
} from '../utils/bitmapFont'

interface RankNumberProps {
  rank: string
  width?: number
  height?: number
  className?: string
}

const VALID_RANKS = new Set([
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'A',
])
const DEFAULT_WIDTH = 32
const DEFAULT_HEIGHT = 23

function RankNumber({
  rank,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  className,
}: RankNumberProps) {
  const [fontData, setFontData] = useState<FontData | null>(null)

  useEffect(() => {
    loadBitmapFont('/assets/rank-text.xml').then(setFontData)
  }, [])

  const normalizedRank = rank.trim().toUpperCase()

  if (!VALID_RANKS.has(normalizedRank)) {
    return null
  }

  if (!fontData) {
    return (
      <div
        className={className}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        {normalizedRank}
      </div>
    )
  }

  const charId = normalizedRank.charCodeAt(0).toString()
  const char = fontData.chars[charId]

  if (!char) return null

  const scaleX = width / char.width
  const scaleY = height / char.height

  return (
    <div
      className={className}
      style={{
        backgroundImage: `url(/assets/${fontData.imagePath})`,
        backgroundPosition: `${-char.x * scaleX}px ${-char.y * scaleY}px`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: `${fontData.imageWidth * scaleX}px ${fontData.imageHeight * scaleY}px`,
        width: `${width}px`,
        height: `${height}px`,
        display: 'inline-block',
      }}
    />
  )
}

export default RankNumber
