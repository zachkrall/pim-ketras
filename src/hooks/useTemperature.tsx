import { useReducer } from 'react'

export const useTemperature = () => {
  const settings = {
    min: 0,
    max: 1,
  }

  const [state, dispatch] = useReducer(
    (_state: number, action: number) => {
      return Math.min(Math.max(action, settings.min), settings.max)
    },
    0.35
  )

  return [state, dispatch, settings] as const
}
