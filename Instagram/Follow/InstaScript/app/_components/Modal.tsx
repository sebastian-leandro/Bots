interface ModalProps {
  error: string
  fn: (value: boolean) => void
  value: boolean
}

function Modal ({error, fn, value}: ModalProps): React.ReactNode {
  return (
    <>
      <div className={`${value ? 'opacity-100' : 'opacity-0'} duration-500 absolute top-0 left-0 w-full h-full z-20 bg-black/40 grid place-items-center backdrop-blur-md`}>
        <div className={`${value ? 'translate-y-0' : '-translate-y-[500%]'} duration-500 max-w-[300px] py-6 px-8 rounded-lg text-center w-full h-auto bg-white/80 backdrop-blur-lg`}>
          <div className='flex flex-col gap-y-8'>
            <p className='text-small text-black/90 font-normal'>{error}</p>
            <button className='btn' onClick={() => fn(false)}>Close</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal