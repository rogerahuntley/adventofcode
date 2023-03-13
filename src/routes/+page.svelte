<script lang="ts">
  import Sidebar from '$lib/components/layout/Sidebar.svelte'
  import Runner from '$lib/components/Runner.svelte'
  import SolutionSelect from '$lib/components/SolutionSelect.svelte'
  import { solutionHandler, fileHandler } from '$lib/getFilesClient'
  export let data
  const { solutions, solutionMap, inputs } = data
  const inp = fileHandler(solutions, inputs)
  const sol = solutionHandler(solutionMap)

  let year: number | undefined
  let day: number | undefined
  let solution: string | undefined

  let script: string | undefined
  let input: string | undefined

  let link: string | undefined = undefined

  $: {
    if (year && day) {
      link = sol.getLink(year, day)
      if (solution) {
        script = inp.getSolution(year, day, solution)
        input = inp.getInput(year, day)
      }
    }
  }
</script>

<div class="main">
  <div class="sidebar">
    <Sidebar>
      <SolutionSelect bind:year bind:day bind:solution solutions={solutionMap} />
    </Sidebar>
  </div>
  <div class="runner">
    <Runner {link} {input} {script} />
  </div>
</div>

<style lang="scss">
  @import 'src/lib/styles/mobile.scss';

  .main {
    display: flex;
    flex-direction: column;
    @media screen and (min-width: $screen-sm-min) {
      flex-direction: row;
    }
  }

  .sidebar {
    min-width: 8rem;
  }

  .runner {
    width: 100%;
  }
</style>
