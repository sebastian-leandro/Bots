import { type ModalProps } from '@/types/types'
import { Button } from './ui/button'

function Modal ({ message, onClose }: ModalProps): React.ReactNode {
  return (
    <>
      <div className='w-full h-full absolute top-0 left-0 z-50 grid place-items-center bg-black/40 transition-all duration-300'>
        <div className='max-w-[360px] px-4 py-8 text-center w-full h-auto rounded-lg bg-white/50 backdrop-blur-3xl shadow-sm shadow-white/50 flex flex-col justify-center items-center gap-y-4'>
          <p className='text-base font-normal'>{message}</p>
          <Button onClick={() => { onClose(false) }} variant={'default'}>Close</Button>
        </div>
      </div>
    </>
  )
}

export default Modal
