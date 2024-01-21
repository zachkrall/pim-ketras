import { FC } from 'react'

const Lyrics: FC<{ text: string }> = ({ text }) => {
  return (
    <div className={'leading-loose'}>
      {text.split('\n').map((e, i) => (
        <div key={e + i}>{e}</div>
      ))}
    </div>
  )
}

export default Lyrics
