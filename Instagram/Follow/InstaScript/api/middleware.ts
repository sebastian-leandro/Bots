import jwt, { type JwtPayload } from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'

interface RequestWithUser extends Request {
  user?: string | JwtPayload
}

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY ?? 'random'

export function generateToken (user: { username: string }): string | undefined {
  try {
    return jwt.sign({ username: user.username }, JWT_SECRET_KEY, { expiresIn: '1744129183' })
  } catch (err) { console.error(err) }
}

export function authenticateToken (req: RequestWithUser, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization
  const token = authHeader?.split(' ')[1]

  console.log(token)
  console.log('Authorization Header:', authHeader)

  if (!token) {
    res.status(401).json({ message: 'Token no provided' })
    console.log('Token not provided')
    return
  }

  jwt.verify(token, JWT_SECRET_KEY, (err, decode) => {
    if (err) {
      console.log(err)
      return res.status(401).json({ message: 'Invalid token' })
    }
    req.user = decode
    next()
  })
}
