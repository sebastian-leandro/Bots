function Loader (): React.ReactNode {
  return (
    <>
      <div className='w-full h-full grid z-50 place-items-center bg-black/50 fixed top-0 left-0'>
        <span className='w-8 h-8 border-blue-500/80 border-4 border-sold rounded-full animate-spin spin-in-180 spin-out-180'></span>
      </div>
    </>
  )
}

export default Loader
