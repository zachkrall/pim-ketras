import { useState, useCallback } from 'react'
import * as tf from '@tensorflow/tfjs'
// import { setWasmPaths } from '@tensorflow/tfjs-backend-wasm'

import { generateText } from '../ml/model.js'
import { TextData } from '../ml/data.js'

// react hook for generating new pim ketras lyrics

export function useLyricGen({
  temperature,
  numCharacters,
}: any): [() => Promise<void>, () => Promise<void>, string, string] {
  const [lyrics, setLyrics] = useState('')
  const [status, setStatus] = useState('Ready')

  const paths = {
    corpus: '/corpus.txt',
    model: '/model.json',
  }

  const createLyrics = async (
    temperature: number,
    onStatusChange: ((...e: any) => any) | null = null
  ) => {
    const s = (e: any) => {
      new Promise<void>((resolve, reject) => {
        if (onStatusChange) {
          onStatusChange(e)
          resolve()
        } else {
          console.log(e)
          reject()
        }
      })
    }

    await s('Loading Corpus...')
    const corpus: string = await fetch(paths.corpus, {
      method: 'GET',
    })
      .then((res) => res.text())
      .catch((err) => {
        console.error(err)
        return ''
      })

    await s('Loading Model...')

    const model: tf.LayersModel = await tf.loadLayersModel(paths.model)
    const sampleLen: number = model.inputs[0].shape[1] || 0

    await s('Generating Seed Text...')
    const textData: TextData = new TextData(
      'text-data',
      corpus,
      sampleLen,
      3
    )

    const [seed, sentenceIndices]: [
      string,
      number[]
    ] = textData.getRandomSlice()

    await s('Writing Lyrics...')
    // const lyrics = 'ok'
    //@ts-ignore
    const l = await generateText(
      model,
      textData,
      sentenceIndices,
      numCharacters,
      temperature
    )

    return seed + l
  }

  const generateLyrics: () => Promise<void> = useCallback(async () => {
    const l = await createLyrics(temperature, (e) => setStatus(e))
    setLyrics(l)
    setStatus('Ready')
  }, [temperature])

  const addLyrics: () => Promise<void> = useCallback(async () => {
    const newLyrics = await createLyrics(temperature, (e) =>
      setStatus(e)
    )
    setLyrics(lyrics + '\n \n' + newLyrics)
    setStatus('Ready')
  }, [lyrics, temperature])

  return [generateLyrics, addLyrics, status, lyrics]
}
