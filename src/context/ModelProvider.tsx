import {
  useState,
  useCallback,
  useRef,
  useEffect,
  createContext,
  useMemo,
  PropsWithChildren,
  FC,
  useContext,
} from 'react'
import * as tf from '@tensorflow/tfjs'
import { generateText } from '../ml/model.js'
import { TextData } from '../ml/data.js'
import { useTemperature } from '../hooks/useTemperature.js'
import { useBackend } from '../hooks/useBackend.js'

const constants = {
  corpusPath: '/corpus.txt',
  modelPath: '/model.json',
}

export type ModelContextType = {
  // backend
  backend: 'webgl' | 'cpu'
  setBackend: (backend: 'webgl' | 'cpu') => void

  // temperature
  temperature: number
  setTemperature: (temperature: number) => void

  // character limit
  characterLimit: number
  setCharacterLimit: (characterLimit: number) => void

  // state
  readyToGenerate: boolean

  // lyrics
  generateLyrics: () => Promise<void>
  addLyrics: () => Promise<void>
  status: string
  lyrics: string
  corpusIsLoaded: boolean
  modelIsLoaded: boolean
}

export const ModelContext = createContext<ModelContextType | null>(null)

export const useModel = () => {
  const ctx = useContext(ModelContext)

  if (ctx === null) {
    throw new Error('useModel must be used within a ModelProvider')
  }

  return ctx
}

export const ModelProvider: FC<PropsWithChildren> = ({ children }) => {
  const [backend, setBackend] = useBackend()
  const [temperature, setTemperature] = useTemperature()
  const [characterLimit, setCharacterLimit] = useState(600)

  const [lyrics, setLyrics] = useState<string>('')
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
      tf.loadLayersModel(constants.modelPath)
        .then((model) => {
          modelRef.current = model
          setModelIsLoaded(true)
          console.log('model loaded')
        })
        .catch((e) => {
          console.log(e)
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

  const ctx = useMemo(
    () => ({
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
    }),
    [
      backend,
      setBackend,
      temperature,
      setTemperature,
      characterLimit,
      setCharacterLimit,
      readyToGenerate,
      generateLyrics,
      addLyrics,
      status,
      lyrics,
      corpusIsLoaded,
      modelIsLoaded,
    ]
  )

  return (
    <ModelContext.Provider value={ctx}>
      {children}
    </ModelContext.Provider>
  )
}
