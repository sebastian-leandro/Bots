import { readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'

import { paths } from '../constants/variables.js'

export async function loadUsers () {
  let usersSet = new Set()
  if (!existsSync(paths.cookies)) return usersSet
  try {
    const usersList = await readFile(paths.users, 'utf-8')
    const usersArr = usersList ? JSON.parse(usersList) : []
    usersSet = new Set(usersArr)
  } catch (err) {
    console.error(`There was a problem trying to read or parsing the users file. Error: ${err}`)
    usersSet = new Set()
  }
  return usersSet
}

export async function saveUsers (browser, user, usersSet) {
  try {
    if (user) {
      usersSet.add(user)
      await writeFile(paths.users, JSON.stringify([...usersSet]), 'utf-8')
    }
  } catch (err) {
    console.error(`There was a problem trying to save the users. Error: ${err}`)
    await browser.close()
    process.exit(1)
  }
}
