function Cursor() {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          // This is a bit hacky, but it positions the cursor to the left of the selected card
          left: '-10%',
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      >
        <img
          src="/assets/cursor.png"
          alt="Cursor"
          style={{ width: '40px', height: '24px' }}
        />
      </div>
    </>
  )
}

export default Cursor
