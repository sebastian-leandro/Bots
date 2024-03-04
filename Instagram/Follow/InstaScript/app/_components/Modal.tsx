import { type ModalProps } from '@/types/types'
import { Button } from './ui/button'

function Modal ({ message, onErrorClose, onSuccessClose }: ModalProps): React.ReactNode {
  const handleClose = (): void => {
    onErrorClose(false)
    onSuccessClose(false)
  }

  return (
    <>
      <div className='w-full h-full absolute top-0 left-0 z-50 grid place-items-center bg-black/40 transition-all duration-300'>
        <div className='max-w-[360px] px-4 py-8 text-center w-full h-auto rounded-lg border border-black/80 bg-black/50 backdrop-blur-md flex flex-col justify-center items-center gap-y-4'>
          <h4 className='title text-pretty' style={{ fontSize: '1.1rem', fontWeight: '500' }}>{message}</h4>
          <Button onClick={handleClose} variant={'default'}>Close</Button>
        </div>
      </div>
    </>
  )
}

export default Modal
