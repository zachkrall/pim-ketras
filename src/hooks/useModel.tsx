import { useState, useCallback, useRef, useEffect } from 'react'
import * as tf from '@tensorflow/tfjs'
import { generateText } from '../ml/model.js'
import { TextData } from '../ml/data.js'
import { useTemperature } from './useTemperature.js'
import { useBackend } from './useBackend.js'

const constants = {
  corpusPath: '/corpus.txt',
  modelPath: '/model.json',
}

export const useModel = () => {
  const [backend, setBackend] = useBackend()
  const [temperature, setTemperature] = useTemperature()
  const [characterLimit, setCharacterLimit] = useState(600)

  const [lyrics, setLyrics] = useState('')
  const [status, setStatus] = useState('Ready')

  const [corpusIsLoaded, setCorpusIsLoaded] = useState(false)
  const corpusRef = useRef<string | null>(null)
  const [modelIsLoaded, setModelIsLoaded] = useState(false)
  const modelRef = useRef<tf.LayersModel | null>(null)

  const readyToGenerate = [
    corpusIsLoaded,
    modelIsLoaded,
    status === 'Ready',
  ].every((x) => x === true)

  // load model and corpus on init
  useEffect(() => {
    if (modelRef.current === null) {
      tf.loadLayersModel(constants.modelPath).then((model) => {
        modelRef.current = model
        setModelIsLoaded(true)
      })
    }
    if (corpusRef.current === null) {
      fetch(constants.corpusPath, {
        method: 'GET',
      })
        .then((res) => res.text())
        .then((corpus) => {
          corpusRef.current = corpus
          setCorpusIsLoaded(true)
        })
    }
  }, [])

  const createLyrics = async (
    temperature: number,
    onStatusChange: ((...e: any) => any) | null = null,
    onChar: (char: string) => void
  ) => {
    if (modelRef.current === null) {
      return
    }

    if (corpusRef.current === null) {
      return
    }

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

    await s('Loading Model...')

    const sampleLen: number = modelRef.current.inputs[0].shape[1] || 0

    await s('Generating Seed Text...')
    const textData: TextData = new TextData(
      'text-data',
      corpusRef.current,
      sampleLen,
      3
    )

    const [seed, sentenceIndices]: [string, number[]] =
      textData.getRandomSlice()

    onChar(seed)

    await s('Writing Lyrics...')

    await new Promise((resolve) => setTimeout(resolve, 1000))

    await generateText(
      modelRef.current,
      textData,
      sentenceIndices,
      characterLimit,
      temperature,
      async (char) => {
        console.log({ char })
        onChar(char)
      }
    )

    return
  }

  const generateLyrics: () => Promise<void> = useCallback(async () => {
    setLyrics('')

    await createLyrics(
      temperature,
      (e) => setStatus(e),
      (char) => {
        setLyrics((prev) => `${prev}${char}`)
      }
    )
    setStatus('Ready')
  }, [temperature])

  const addLyrics: () => Promise<void> = useCallback(async () => {
    setStatus('Generating...')
    await createLyrics(
      temperature,
      (e) => setStatus(e),
      (char) => {
        setLyrics((prev) => prev + char)
      }
    )
    setStatus('Ready')
  }, [lyrics, temperature])

  return {
    // backend
    backend,
    setBackend,

    // temperature
    temperature,
    setTemperature,

    // character limit
    characterLimit,
    setCharacterLimit,

    // state
    readyToGenerate,

    // lyrics
    generateLyrics,
    addLyrics,
    status,
    lyrics,
    corpusIsLoaded,
    modelIsLoaded,
  }
}
