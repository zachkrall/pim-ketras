import * as tf from '@tensorflow/tfjs'
import { useState } from 'react'

export const useBackend = () => {
  const [backend, setBackend] = useState<'cpu' | 'webgl'>(() => {
    const backend = tf.getBackend()
    if (backend === 'cpu' || backend === 'webgl') {
      return backend
    }
    return 'cpu'
  })

  const changeBackend = (backend: 'cpu' | 'webgl') => {
    return tf
      .setBackend(backend)
      .then(() => {
        setBackend(backend)
      })
      .catch(() => {
        setBackend('cpu')
      })
  }

  return [backend, changeBackend] as const
}
