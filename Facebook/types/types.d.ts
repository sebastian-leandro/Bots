interface Init {
  browser: Browser
  page: Page
}

interface Cookie {
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

interface AsyncGeneratorType {
  action: string
  message?: string
  usersList?: Set<string>
  titlesList?: Set<string>
  user?: string
  titles?: string
}

export type { Init, Cookie, AsyncGeneratorType }
