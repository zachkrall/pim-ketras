import { useModel } from '@/context/ModelProvider'
import { cn } from '@/lib/utils'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Slider } from './ui/slider'
import { Button } from './ui/button'

export const Settings = () => {
  const {
    backend,
    setBackend,
    temperature,
    setTemperature,
    characterLimit,
    setCharacterLimit,
    readyToGenerate,
  } = useModel()

  return (
    <div className={cn('bg-white rounded-xl', 'p-4')}>
      <div
        className={cn(
          'flex flex-col gap-3',
          readyToGenerate === false && 'pointer-events-none opacity-40'
        )}
      >
        <div>
          <label className={'text-sm font-semibold'}>
            Tensorflow Backend
          </label>
          <div>
            <RadioGroup
              value={backend}
              onValueChange={(value) => {
                if (value === 'webgl' || value === 'cpu') {
                  setBackend(value)
                }
              }}
              className={'flex flex-row gap-4'}
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="cpu" id="r1" />
                <label htmlFor="r1">CPU</label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="webgl" id="r2" />
                <label htmlFor="r2">WebGL</label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <div>
          <label className={'text-sm font-semibold'}>Temperature</label>
          <div className={'flex flex-row gap-2 items-center'}>
            <div className={'tabular-nums'}>
              {temperature.toFixed(2)}
            </div>
            <Slider
              value={[temperature]}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(e) => {
                const x = e[0]

                if (typeof x !== 'number') return

                setTemperature(x)
              }}
            />
          </div>
        </div>
        <div>
          <label className={'text-sm font-semibold'}>
            Character Count
          </label>
          <div className={'flex flex-row gap-2 items-center'}>
            <div className={'tabular-nums'}>
              {characterLimit.toString().padStart(3, '0')}
            </div>
            <Slider
              value={[characterLimit]}
              min={50}
              max={1200}
              step={1}
              onValueChange={(e) => {
                const x = e[0]

                if (typeof x !== 'number') return

                setCharacterLimit(x)
              }}
            />
          </div>
        </div>

        <div className={'flex items-center justify-between'}>
          <Button
            variant={'default'}
            onClick={() => {
              setBackend('cpu')
              setTemperature(0.35)
              setCharacterLimit(200)
            }}
            disabled={readyToGenerate === false}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}
