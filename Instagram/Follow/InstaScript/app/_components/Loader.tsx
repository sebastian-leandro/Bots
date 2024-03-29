function Loader ({ text }: { text: string }): React.ReactNode {
  return (
    <>
      <div className='w-full h-full grid z-50 place-items-center bg-black/50 fixed top-0 left-0 transition-all duration-300'>
        <div className='flex flex-col px-12 py-16 bg-black/70 backdrop-blur-md rounded-lg border border-black/80 gap-y-4 text-center w-fit items-center'>
          <span className='w-8 h-8 border-blue-500/80 border-4 border-sold rounded-full animate-spin spin-in-180 spin-out-180'></span>
          <p className='title text-center' style={{ fontSize: '1.2rem', fontWeight: '600' }}>{text}</p>
        </div>
      </div>
    </>
  )
}

export default Loader
