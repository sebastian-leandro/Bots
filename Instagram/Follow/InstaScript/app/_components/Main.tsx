'use client'
import { useState } from "react"

import Image from "next/image"
import Config from "./Config"

function Main ({user, account}: { user:string, account: string }): React.ReactNode {
  const [config, setConfig] = useState<boolean>(false)

  const handleInit = async (): Promise<void> => {
    const res = await fetch('/init')
    const data = await res.json()
  }

  return (
    <>
      <section className='w-full h-full place-items-center grid'>
        <div className='w-full h-full px-4 py-6 flex flex-col'>
          <nav className='flex w-full h-16 justify-between'>
            <h3 className='text-3xl font-bold text-white mb-4'>Config Panel</h3>
            <div className='flex gap-x-4'>
              <button className='btn h-fit' onClick={handleInit}>Init</button>
              <button className='btn h-fit' onClick={(): void => setConfig(!config)}>Config</button>
            </div>
          </nav>
          <div className='grid grid-cols-5 w-full h-full gap-8'>
            <div className='col-span-3 w-full h-full px-4 card py-2'>
              <h4>Follow User</h4>
              <ul className='flex flex-col gap-y-2'>

              </ul>
            </div>
            <div className='col-span-2 w-full h-full card px-4 py-2'>
              <h4>Counter</h4>
              <div className='flex items-center justify-center w-full h-full'>
                <span className='text-base font-normal'>--</span>
              </div>
            </div>
            <div className='col-span-2 w-full h-full card px-4 py-2'>
              <h4 className='title'>Waiting Time</h4>
              <div className='flex items-center justify-center h-full w-full'>
                <span className='text-base font-normal'>0</span>
              </div>
            </div>
            <div className='card col-span-3 w-full h-full px-4 py-2'>
              <h4 className='title'>Config</h4>
              <div className='flex flex-col gap-y-6 items-center justify-center h-full w-full'>
                <div className='flex w-full justify-between h-fit items-center gap-x-4'>
                  <Image src={''} alt='' width={48} height={48} className='rounded-full object-cover' />
                  <h3 className='title'>{user}</h3>
                  <button className='btn'>Edit</button>
                </div>
                <div className='flex w-full justify-between items-center h-fit gap-x-4'>
                  <Image src={''} alt='' width={48} height={48} className='rounded-full object-cover' />
                  <h3 className='name'>{account}</h3>
                  <button className='btn'>Edit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {config && <Config setConfig={setConfig} />}
      </section>
    </>
  )
}

export default Main