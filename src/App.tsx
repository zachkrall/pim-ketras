import React, { FC, useState, ChangeEvent } from 'react'

import { useLyricGen } from './hooks'

const StatusComponent = React.lazy(() => import('./components/Status'))
const Lyrics = React.lazy(() => import('./components/Lyrics'))
const Footer = React.lazy(() => import('./components/Footer'))

const App: FC<{}> = () => {
  const [settings, updateSettings] = useState({
    temperature: 0.35,
    numCharacters: 200,
  })

  const [generateLyrics, addLyrics, status, lyrics] = useLyricGen(
    settings
  )

  const updateVal = (e: ChangeEvent<HTMLInputElement>, val: string) => {
    const t = e.target
    updateSettings((prevState) => ({
      ...prevState,
      [val]: Number(t.value || 0),
    }))
  }

  return (
    <div id="container">
      <header className="center">
        <h1>Pim Ketras</h1>
      </header>

      <div>
        <label>{'Temperature'.toUpperCase()}</label>
        <input
          type="range"
          value={settings.temperature}
          min="0.01"
          max="0.99"
          step="0.01"
          onChange={(e) => updateVal(e, 'temperature')}
        />
        {settings.temperature.toString()}
      </div>
      <button onClick={generateLyrics} disabled={status !== 'Ready'}>
        Start Over
      </button>

      <StatusComponent text={status} />
      <Lyrics text={lyrics} />
      {lyrics.length > 0 && (
        <button onClick={addLyrics} disabled={status !== 'Ready'}>
          Add More Lines
        </button>
      )}
      <Footer />
    </div>
  )
}

export default App
