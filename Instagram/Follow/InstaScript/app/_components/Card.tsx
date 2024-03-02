import { Button } from './ui/button'

function Card ({ title, paragraph }: { title: string, paragraph: string }): React.ReactNode {
  return (
      <>
        <div className='max-h-[230px] h-full max-w-[280px] px-2 py-8 bg-black/80 border border-violet-500/90 rounded-lg w-full'>
          <div className='w-full h-full flex items-center justify-center gap-y-4 flex-col'>
            <h3 className='title'>{title}</h3>
            <p className='paragraph'>{paragraph}</p>
            <Button title='Start' className='w-fit py-2 px-6 h-fit'>Start</Button>
          </div>
        </div>
      </>
  )
}

export default Card
