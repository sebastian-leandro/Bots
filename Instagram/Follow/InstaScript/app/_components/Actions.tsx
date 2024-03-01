import Navbar from './Navbar'

function Actions ({ profile, logged }: { profile: string, logged: (value: boolean) => void }): React.ReactNode {
  return (
      <>
        <Navbar username={profile} logged={logged} />
      </>
  )
}

export default Actions
