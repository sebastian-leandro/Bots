import { Button } from './ui/button'
import type { InputProps } from '@/types/types'

function Input ({ search, handleFollow, setError, setErrorMessage }: InputProps): React.ReactNode {
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => { search(event.target.value) }
  const follow = (): void => {
    if (search.length > 3) {
      handleFollow(true)
    } else {
      setError(true)
      setErrorMessage('Search must contain at least 3 characters')
    }
  }
  return (
    <>
      <div className='w-full h-full absolute top-0 left-0 z-50 grid place-items-center bg-black/40'>
        <div className='max-w-[360px] px-4 py-8 text-center w-full h-auto rounded-lg bg-white/50 backdrop-blur-3xl shadow-sm shadow-white/50 flex flex-col justify-center items-center gap-y-4'>
          <input onChange={handleInput} className='input' />
          <Button variant={'default'} onClick={follow}>Send</Button>
        </div>
      </div>
    </>
  )
}

export default Input
