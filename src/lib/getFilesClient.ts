import type { solutions, inputs, solutionMap } from '$lib/types/base.types'

// we can send this to the front end to build the nav
const solutionHandler = (solutions: solutionMap) => {
  const getYears = () => {
    return solutions
      .reduce((acc, [year]) => {
        if (!acc.includes(year)) acc.push(year)
        return acc
      }, [] as number[])
      .sort((a, b) => a - b)
  }

  const getDays = (year: number) => {
    return solutions
      .reduce((acc, [y, day]) => {
        if (y == year && !acc.includes(day)) acc.push(day)
        return acc
      }, [] as number[])
      .sort((a, b) => a - b)
  }

  const getSolutions = (year: number, day: number) => {
    return solutions
      .reduce((acc, [y, d, solution]) => {
        if (y == year && d == day && !acc.includes(solution)) acc.push(solution)
        return acc
      }, [] as string[])
      .sort((a, b) => a.localeCompare(b))
  }

  const getLink = (year: number, day: number) => {
    return `https://adventofcode.com/${year}/day/${day}`
  }

  return {
    getYears,
    getDays,
    getSolutions,
    getLink,
  }
}

// these should be called on the server
const fileHandler = (solutions: solutions, inputs: inputs) => {
  const getSolution = (year: number, day: number, solution: string) => {
    return solutions[year]?.[day]?.[solution] || ''
  }

  const getInput = (year: number, day: number) => {
    return inputs[year]?.[day] || ''
  }

  return {
    getSolution,
    getInput,
  }
}

export { solutionHandler, fileHandler }
