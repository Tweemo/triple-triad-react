interface HandProps {
  user: string
  cards: number[]
}

function Hand({ user, cards }: HandProps) {
  return (
    <div className="hand">
      <div className="cards">
        {cards.map((card) => (
          <img
            key={card}
            className={user}
            src={`assets/cards/${card}.png`}
            alt={`Card ${card}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Hand
