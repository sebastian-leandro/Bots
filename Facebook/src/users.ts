import { writeFile, readFile } from 'node:fs/promises'
import { existsSync } from 'fs'

export async function loadUser (path: string): Promise<Set<any>> {
  let users = new Set()
  if (!existsSync(path)) return users
  try {
    const usersList = await readFile(path, 'utf-8')
    const usersArray: string[] = typeof usersList === 'string' ? JSON.parse(usersList) : []
    users = new Set(usersArray)
  } catch (err) {
    console.error(err)
    users = new Set()
  }
  return users
}

export async function saveUser (path: string, users: Set<string>, user: string): Promise<void> {
  if (user !== null && user !== undefined) {
    try {
      users.add(user)
      await writeFile(path, JSON.stringify(Array.from(users), null, 2))
    } catch (err) {
      console.error(err)
      process.exit(1)
    }
  }
}
