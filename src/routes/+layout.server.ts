import { solutions, solutionMap, inputs } from '$lib/stores/aoc-repo.store'

export function load() {
  return {
    solutions,
    solutionMap,
    inputs,
  }
}
