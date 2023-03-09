<script lang="ts">
  import Runner from '$lib/Runner.svelte'
  import { solutionHandler, fileHandler } from '$lib/getFilesClient'
  export let data
  const { solutions, solutionMap, inputs } = data
  const sol = solutionHandler(solutionMap)
  const inp = fileHandler(solutions, inputs)

  let year: number | undefined
  let day: number | undefined
  let solution: string | undefined

  let script: string | undefined
  let input: string | undefined

  $: {
    if (year && day && !sol.getDays(year).includes(day)) {
      day = sol.getDays(year)[0]
    }
    if (year && day && solution && !sol.getSolutions(year, day).includes(solution)) {
      solution = sol.getSolutions(year, day)[0]
    }
  }

  $: {
    if (year && day && solution) {
      script = inp.getSolution(year, day, solution)
      input = inp.getInput(year, day)
    }
  }
</script>

<select bind:value={year}>
  {#each sol.getYears() as year}
    <option value={year}>
      {year}
    </option>
  {/each}
</select>

{#if year}
  <select bind:value={day}>
    {#each sol.getDays(year) as day}
      <option value={day}>
        {day}
      </option>
    {/each}
  </select>
{/if}

{#if year && day}
  <select bind:value={solution}>
    {#each sol.getSolutions(year, day) as solution}
      <option value={solution}>
        {solution}
      </option>
    {/each}
  </select>
{/if}

<Runner {input} {script} />
