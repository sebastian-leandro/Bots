import { existsSync } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'
import { paths } from '../constants/variables.js'

export async function loadUsers () {
  let usersSet = new Set()
  if (!existsSync(paths.users)) return usersSet
  try {
    const usersListStr = await readFile(paths.users, 'utf-8')
    const usersArray = usersListStr ? JSON.parse(usersListStr) : []
    usersSet = new Set(usersArray)
  } catch (err) {
    console.error('Error loading or parsing users list. Error: ', err)
    usersSet = new Set()
  }
  return usersSet
}

export async function saveUsers (browser, user, usersSet) {
  try {
    if (user !== null && user !== undefined) {
      usersSet.add(user)
      await writeFile(paths.users, JSON.stringify([...usersSet]), 'utf-8')
    }
  } catch (error) {
    console.error(`It was a problem trying save the user: ${error}`)
    await browser.close()
    process.exit(1)
  }
}
