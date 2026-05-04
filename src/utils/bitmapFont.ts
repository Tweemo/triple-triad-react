export interface CharData {
  id: number
  x: number
  y: number
  width: number
  height: number
  xoffset: number
  yoffset: number
  xadvance: number
}

export interface FontData {
  chars: Record<string, CharData>
  imageWidth: number
  imageHeight: number
  imagePath: string
}

export async function loadBitmapFont(xmlPath: string): Promise<FontData> {
  const response = await fetch(xmlPath)
  const xml = await response.text()
  const parser = new DOMParser()
  const doc = parser.parseFromString(xml, 'text/xml')

  const charElements = doc.querySelectorAll('char')
  const chars: Record<string, CharData> = {}

  let measuredWidth = 0
  let measuredHeight = 0

  charElements.forEach((el) => {
    const id = el.getAttribute('id')!
    const charData = {
      id: parseInt(id),
      x: parseInt(el.getAttribute('x')!),
      y: parseInt(el.getAttribute('y')!),
      width: parseInt(el.getAttribute('width')!),
      height: parseInt(el.getAttribute('height')!),
      xoffset: parseInt(el.getAttribute('xoffset')!),
      yoffset: parseInt(el.getAttribute('yoffset')!),
      xadvance: parseInt(el.getAttribute('xadvance')!),
    }

    chars[id] = charData
    measuredWidth = Math.max(measuredWidth, charData.x + charData.width)
    measuredHeight = Math.max(measuredHeight, charData.y + charData.height)
  })

  const common = doc.querySelector('common')!
  const pages = doc.querySelector('page')!

  return {
    chars,
    imageWidth: Math.max(parseInt(common.getAttribute('scaleW')!), measuredWidth),
    imageHeight: Math.max(parseInt(common.getAttribute('scaleH')!), measuredHeight),
    imagePath: pages.getAttribute('file')!,
  }
}

export function getCharBackgroundPosition(charData: CharData): string {
  return `${-charData.x}px ${-charData.y}px`
}