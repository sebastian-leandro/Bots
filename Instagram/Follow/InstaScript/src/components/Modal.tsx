function Modal ({ message, fn }: { message: string, fn: () => void }): React.ReactNode {
  return (
    <>
      <div className='w-screen h-screen absolute top-0 left-0 z-50 bg-black/40 grid place-items-center'>
        <div className='w-80 h-56 flex items-center flex-col gap-y-4 justify-center rounded-lg shadow-sm shadow-black/50 bg-slate-200/75 backdrop-blur-lg'>
          <p className='text-base text-black font-normal text-pretty'>{message}</p>
          <button className='button' onClick={fn}>Close</button>
        </div>
      </div>
    </>
  )
}

export default Modal
