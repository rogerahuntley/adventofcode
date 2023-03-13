<script lang="ts">
  import { solutionHandler } from '$lib/getFilesClient'
  import type { solutionMap as t_solutionMap } from '$lib/types/base.types'
  import MediaQuery from './helpers/MediaQuery.svelte'
  import { mobile } from '$lib/styles/mobile'

  export let year: number | undefined
  export let day: number | undefined
  export let solution: string | undefined

  export let solutions: t_solutionMap
  const solutionMap = solutionHandler(solutions)

  $: {
    if (year && day && !solutionMap.getDays(year).includes(day)) {
      day = solutionMap.getDays(year)[0]
    }
    if (year && day && solution && !solutionMap.getSolutions(year, day).includes(solution)) {
      solution = solutionMap.getSolutions(year, day)[0]
    }
  }
</script>

<MediaQuery query="(min-width: {mobile.screenSmMin})" let:matches let:loaded>
  {#if !matches}
    <div class="select">
      <select bind:value={year}>
        {#each solutionMap.getYears() as year}
          <option value={year}>
            {year}
          </option>
        {/each}
      </select>

      {#if year}
        <select bind:value={day}>
          {#each solutionMap.getDays(year) as day}
            <option value={day}>
              {day}
            </option>
          {/each}
        </select>
      {/if}

      {#if year && day}
        <select bind:value={solution}>
          {#each solutionMap.getSolutions(year, day) as solution}
            <option value={solution}>
              {solution}
            </option>
          {/each}
        </select>
      {/if}
    </div>
  {:else}
    <div class="list">
      <div class="years">
        Years
        {#each solutionMap.getYears() as _year}
          <button on:click={() => (year = _year)} disabled={year == _year}>
            {_year}
          </button>
        {/each}
      </div>

      <div class="days">
        {#if year}
          Days
          {#each solutionMap.getDays(year) as _day}
            <button on:click={() => (day = _day)} disabled={day == _day}>
              {_day}
            </button>
          {/each}
        {/if}
      </div>

      <div class="solutions">
        {#if year && day}
          Solutions
          {#each solutionMap.getSolutions(year, day) as _solution}
            <button on:click={() => (solution = _solution)} disabled={solution == _solution}>
              {_solution}
            </button>
          {/each}
        {/if}
      </div>
    </div>
  {/if}
</MediaQuery>

<style lang="scss">
  @import 'src/lib/styles/mobile.scss';
  .list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    .years,
    .days,
    .solutions {
      margin-inline: 0.5rem;
      display: flex;
      flex-direction: column;
    }
  }
</style>
