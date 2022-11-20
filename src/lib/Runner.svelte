<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  export let script = '';
  export let readonly = true;
  let result = '';
  const run = () => {
    result = new Function(script)();
    dispatch('result', {
      text: result
    });
  };
</script>

<div id="runner">
  <textarea bind:value={script} {readonly} />
  <button on:click={run}>run code</button>
  <input bind:value={result} readonly />
</div>

<style lang="scss">
  #runner {
    display: flex;
    flex-direction: column;
    place-items: center;

    textarea {
      height: 70vh;
    }

    button,
    input {
      width: 148px;
    }
  }
</style>
