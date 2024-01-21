import { useModel } from '@/context/ModelProvider'
import { Box, Check, FileText } from 'lucide-react'
import { FC } from 'react'

const Status: FC = () => {
  const { modelIsLoaded, corpusIsLoaded } = useModel()
  return (
    <div
      className={'text-sm font-semibold flex flex-row flex-wrap gap-4'}
    >
      <div className={'flex items-center gap-1'}>
        <Check className={'w-4 h-4'} />
        {modelIsLoaded ? 'Model' : 'Model Not Ready'}
      </div>
      <div className={'flex items-center gap-1'}>
        <Check className={'w-4 h-4'} />
        {corpusIsLoaded ? 'Corpus' : 'Corpus Not Ready'}
      </div>
    </div>
  )
}

export default Status
