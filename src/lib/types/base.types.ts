type solution = string

type solutions = {
  [year: string]: {
    [day: string]: {
      [solution: string]: solution
    }
  }
}

type solutionPath = [
  number, // year
  number, // day
  string // solution
]

type solutionMap = solutionPath[]

type input = string

type inputs = {
  [year: string]: {
    [day: string]: input
  }
}

export type { solution, solutions, solutionPath, solutionMap, input, inputs }
