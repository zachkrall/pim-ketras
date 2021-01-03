import React, { FC } from 'react'

const Lyrics: FC<{ text: string }> = ({ text }) => {
  return (
    <>
      {text.split('\n').map((e, i) => (
        <div key={e + i}>{e}</div>
      ))}
    </>
  )
}

export default Lyrics
