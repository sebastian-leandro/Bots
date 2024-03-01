interface LoginProps {
  logged: (value: boolean) => void
  setProfile: (value: string) => void
}

interface ModalProps {
  message: string
  onClose: (value: boolean) => void
}

interface InputProps {
  search: (value: string) => void
  handleFollow: (value: boolean) => void
  setError: (value: boolean) => void
  setErrorMessage: (value: string) => void
}

interface TimerProps {
  max?: number
  min?: number
  user?: string
  counter?: number
}

interface CookiesProps {
  name: string
  value: string
  domain?: string
  path?: string
  expires?: number
  size?: number
  httpOnly?: boolean
  secure?: boolean
  session?: boolean
  sameSite?: 'Strict' | 'Lax' | 'None'
  sameParty?: boolean
  sourceScheme?: 'Secure' | 'NonSecure'
  sourcePort?: number
}

export type { LoginProps, ModalProps, InputProps, TimerProps, CookiesProps }
