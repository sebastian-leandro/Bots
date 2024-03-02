function Loader ({ text }: { text: string }): React.ReactNode {
  return (
    <>
      <div className='w-full h-full grid z-50 place-items-center bg-black/50 fixed top-0 left-0 transition-all duration-300'>
        <div className='flex flex-col gap-y-4 text-center w-full items-center'>
          <span className='w-8 h-8 border-blue-500/80 border-4 border-sold rounded-full animate-spin spin-in-180 spin-out-180'></span>
          <p className='title' style={{ fontSize: '1.2rem', fontWeight: '600' }}>{text}</p>
        </div>
      </div>
    </>
  )
}

export default Loader
