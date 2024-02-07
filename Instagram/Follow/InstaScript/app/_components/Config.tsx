function Config ({ setConfig }: { setConfig: (value: boolean) => void }): React.ReactNode {
  return (
    <>
      <div className='z-20 w-full h-full absolute top-0 left-0 grid place-items-center'>
        <div className='max-w-96 w-full card h-full max-h-[480px] px-4 py-8'>
          <button className='btn' onClick={(): void => setConfig(false)}>Close</button>
        </div>
      </div>
    </>
  )
}

export default Config