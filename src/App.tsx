import { FC } from 'react'

import { Footer } from './components/Footer'
import { cn } from './lib/utils'
import { Button } from './components/ui/button'

import Lyrics from './components/Lyrics'
import { Header } from './components/Header'
import { Pencil, Plus, StopCircle } from 'lucide-react'
import { ModelProvider, useModel } from '@/context/ModelProvider'
import { Settings } from './components/Settings'

const LyricsWrapper = () => {
  const {
    lyrics,
    addLyrics,
    generateLyrics,
    readyToGenerate,
    cancelGeneration,
    status,
  } = useModel()

  return (
    <div
      className={cn(
        'relative',
        'min-h-96',
        'flex flex-col bg-white rounded-xl',
        'p-4'
      )}
    >
      <Lyrics text={lyrics} />

      {lyrics.length > 0 ? (
        <div className={'pt-4 flex flex-row gap-3'}>
          <Button
            variant={'default'}
            onClick={addLyrics}
            disabled={status !== 'Ready'}
          >
            {status === 'Ready' ? (
              <div className={'flex items-center gap-2'}>
                Keep going
                <Pencil className={'w-4 h-4'} />
              </div>
            ) : (
              <div className={'tabular-nums'}>Writing...</div>
            )}
          </Button>

          {status !== 'Ready' ? (
            <Button onClick={() => cancelGeneration()}>Stop</Button>
          ) : null}
        </div>
      ) : null}

      {lyrics.length === 0 ? (
        <div
          className={
            'absolute inset-0 flex flex-col items-center justify-center'
          }
        >
          <Button
            variant={'default'}
            onClick={generateLyrics}
            disabled={readyToGenerate === false}
          >
            <div className={'flex items-center gap-2'}>
              Generate
              <Plus className={'w-4 h-4'} />
            </div>
          </Button>
        </div>
      ) : null}
    </div>
  )
}

const App: FC<{}> = () => {
  return (
    <ModelProvider>
      <div
        className={cn(
          'min-h-[100vh]',
          '[background-size:100%_1400px]',
          '[background-repeat:no-repeat]',
          '[background-position:top_center]',
          '[background-image:radial-gradient(circle_at_50%_0%,theme("colors.pink.500")_0%,theme("colors.pink.500")_0px,theme("colors.pink.50")_80%)]'
        )}
      >
        <div className={cn('flex flex-col max-w-2xl mx-auto gap-4')}>
          <Header />
          <Settings />
          <LyricsWrapper />
          <Footer />
        </div>
      </div>
    </ModelProvider>
  )
}

export default App
