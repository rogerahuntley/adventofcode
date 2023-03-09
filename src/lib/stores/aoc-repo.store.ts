import { Octokit } from 'octokit'
import { GITHUB_API_KEY } from '$env/static/private'
import type { solutions, inputs, solutionPath, solutionMap } from '$lib/types/base.types'
import { LocalStorage } from 'node-localstorage'

const localStorage = new LocalStorage('./scratch')

// Octokit.js
// https://github.com/octokit/core.js#readme
const octokit = new Octokit({
  auth: GITHUB_API_KEY,
})

const getAllFiles = async () => {
  let jsFiles: string[] = []
  try {
    jsFiles = JSON.parse(localStorage.getItem('jsFiles') || '')
  } catch {
    if (jsFiles.length) return jsFiles

    const rawFiles = await octokit.request('GET /repos/{owner}/{repo}/git/trees/{branch}', {
      owner: 'rogerahuntley',
      repo: 'adventofcode-solutions',
      branch: 'main',
      recursive: 3,
    })

    // get all .js files
    jsFiles = rawFiles.data.tree
      .filter((f: any) => {
        const path = f.path.split('/')
        return path.length == 3 && path[2].includes('.js')
      })
      .map((f: any) => f.path)

    localStorage.setItem('jsFiles', JSON.stringify(jsFiles))
  }

  return jsFiles
}

const getFile = async (path: string) => {
  let text: string = localStorage.getItem(path) || ''
  if (!text) {
    const fileData = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
      owner: 'rogerahuntley',
      repo: 'adventofcode-solutions',
      path,
    })
    if (!fileData.data.download_url) throw new Error('no download url')
    text = await fetch(fileData.data.download_url).then((seth) => seth.text())
    localStorage.setItem(path, text)
  }
  return text
}

const jsFiles = await getAllFiles()

// now load the files, but we don't want to push these all up just yet
const solutionMap: solutionMap = []
const solutions: solutions = {} // year, day, solution, code

// now that we have all our valid .js files, lets build our year / months array
for (const file of jsFiles) {
  const fileContent = await getFile(file)
  const path = file.split('/')

  // make sure we have enough in the path
  if (path.length != 3) continue

  // add solution to solutionMap
  solutionMap.push(path as solutionPath)

  // add solution to solutions object
  const [year, day, solution] = path
  solutions[year] ||= {}
  solutions[year][day] ||= {}
  solutions[year][day][solution] = fileContent
}

const inputs: inputs = {}

for (const solution of solutionMap) {
  const [year, day] = solution
  if (!inputs[year]?.[day]) {
    inputs[year] ||= {}
    inputs[year][day] ||= ''
    const path = `${year}/${day}/input.txt`
    const input = await getFile(path)
    inputs[year][day] = input
  }
}

export { solutions, solutionMap, inputs }
