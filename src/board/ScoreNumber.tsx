import { useEffect, useState } from 'react'
import { loadBitmapFont, type FontData } from '../utils/bitmapFont'

interface ScoreNumberProps {
  score: number | string
  size?: number
  width?: number
  height?: number
  className?: string
  digitClassName?: string
  gap?: number
}

const DEFAULT_WIDTH = 100
// @todo background position and size ratios need to be adjusted
// with 80 width, position = 400px, size = 900px
const DEFAULT_HEIGHT = 100

function ScoreNumber({
  score,
  size,
  width,
  height,
  className,
  digitClassName,
}: ScoreNumberProps) {
  const [fontData, setFontData] = useState<FontData | null>(null)

  useEffect(() => {
    loadBitmapFont('/assets/score-text.xml').then(setFontData)
  }, [])

  const scoreText = String(score).trim()
  const chars = scoreText.split('')
  const digitWidth = width ?? size ?? DEFAULT_WIDTH
  const digitHeight = height ?? size ?? DEFAULT_HEIGHT

  if (!fontData) {
    return (
      <div
        className={className}
        style={{
          position: 'relative',
          display: 'flex',
        }}
      >
        {scoreText}
      </div>
    )
  }

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        position: 'relative',
        justifyContent: 'center',
      }}
    >
      {chars.map((value, index) => {
        const char = fontData.chars[value.charCodeAt(0).toString()]
        console.log(char.width)

        if (!char) {
          return (
            <div
              key={`${value}-${index}`}
              className={digitClassName}
              style={{ width: `${digitWidth}px`, height: `${digitHeight}px` }}
            >
              {value}
            </div>
          )
        }

        const scaleX = digitWidth / char.width
        const scaleY = digitHeight / char.height

        return (
          <div
            key={`${value}-${index}`}
            className={digitClassName}
            style={{
              backgroundImage: `url(/assets/${fontData.imagePath})`,
              backgroundPosition: `${-char.x * scaleX}px ${-char.y * scaleY}px`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: `${fontData.imageWidth * scaleX}px ${fontData.imageHeight * scaleY}px`,
              width: `${digitWidth}px`,
              height: `${digitHeight}px`,
              display: 'inline-block',
            }}
          />
        )
      })}
    </div>
  )
}

export default ScoreNumber
