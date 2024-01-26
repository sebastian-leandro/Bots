import { readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'

export async function loadData (filepath) {
  let dataSet = new Set()
  if (!existsSync(filepath)) return dataSet
  try {
    const dataList = await readFile(filepath, 'utf-8')
    const dataArr = dataList ? JSON.parse(dataList) : []
    dataSet = new Set(dataArr)
  } catch (err) {
    console.error(`There was a problem trying to read or parsing the data file. Error: ${err}`)
    dataSet = new Set()
  }
  return dataSet
}

export async function saveData (browser, user, users, filepath) {
  try {
    if (user) {
      users.add(user)
      await writeFile(filepath, JSON.stringify([...users]), 'utf-8')
    }
  } catch (err) {
    console.error(`There was a problem trying to save the data. Error: ${err}`)
    await browser.close()
    process.exit(1)
  }
}
