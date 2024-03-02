interface LoginProps {
  username: string
  password: string
  error: boolean
  success: boolean
  message: string
  loading: boolean
  setUsername: (value: string) => void
  setPassword: (value: string) => void
  setMessage: (value: string) => void
  setSuccess: (value: boolean) => void
  setError: (value: boolean) => void
  setLoader: (value: boolean) => void
  logged: (value: boolean) => void
}

interface ModalProps {
  message: string
  onErrorClose: (value: boolean) => void
  onSuccessClose: (value: boolean) => void
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
