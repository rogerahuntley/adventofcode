import { solutions, inputs } from '$lib/stores/aoc-repo.store'
import { fileHandler } from '$lib/getFilesClient'

const defaultFileHandler = fileHandler(solutions, inputs)

export { defaultFileHandler }
