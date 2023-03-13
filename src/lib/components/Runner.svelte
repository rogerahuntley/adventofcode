<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()
  export let script = ''
  export let input = ''
  export let link: string | undefined = undefined
  export let readonly = true
  let result = ''
  const run = () => {
    result = new Function(`let input = \`${input}\`;\n${script}`)()
    dispatch('result', {
      text: result,
    })
  }

  let showInput = false
</script>

<!-- <button on:click={toggleEdit}>
  <Fa icon={faEdit} />
</button> -->

<div id="runner">
  <div class="header">
    {#if showInput}
      <button on:click={() => (showInput = false)}>show solution</button>
    {:else}
      <button on:click={() => (showInput = true)}>show input</button>
    {/if}
    {#if link}
      <a href={link}>link to AOC</a>
    {/if}
  </div>
  <div id="textareas">
    {#if showInput}
      <textarea id="input" bind:value={input} />
    {:else}
      <textarea id="script" bind:value={script} {readonly} />
    {/if}
  </div>
  <button on:click={run}>run code</button>
  <input bind:value={result} readonly />
</div>

<style lang="scss">
  #runner {
    width: 100%;
    display: flex;
    flex-direction: column;
    place-items: center;

    #textareas {
      display: flex;
      flex-direction: row;

      width: 100%;
      #input {
        width: 100%;
        flex: 1;
      }
      #script {
        width: 100%;
        flex: 2;
      }
    }
    textarea {
      height: 70vh;
      resize: none;
    }

    button,
    input {
      width: 148px;
    }
  }
</style>
