import Navbar from './Navbar'
import Card from './Card'

function Actions ({ profile, logged }: { profile: string, logged: (value: boolean) => void }): React.ReactNode {
  return (
      <>
        <Navbar username={profile} logged={logged} />
        <div className='grid w-full h-full'>
          <div className='flex flex-col gap-y-4 my-auto'>
            <div className='flex gap-x-4 items-center justify-center w-full h-full'>
              <Card title='Follow' paragraph='Start following now' />
              <Card title='Unfollow' paragraph='Stop following now' />
            </div>
            <div className='flex gap-x-4 w-full h-full items-center justify-center'>
              <Card title='Like' paragraph='Start liking now' />
              <Card title='Unlike' paragraph='Stop liking now' />
            </div>
          </div>
        </div>
      </>
  )
}

export default Actions
