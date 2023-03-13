<script type="ts">
  import { onMount } from 'svelte'

  export let query: string
  let matches = false
  let loaded = false

  const mqlListener = (e: MediaQueryListEvent) => (matches = e.matches)
  let mql: MediaQueryList
  let wasMounted = false

  onMount(() => {
    wasMounted = true
    return () => {
      removeActiveListener()
    }
  })

  $: {
    if (wasMounted) {
      removeActiveListener()
      addNewListener(query)
    }
  }

  function addNewListener(query: string) {
    mql = window.matchMedia(query)
    mql.addEventListener('change', mqlListener)
    matches = mql.matches
    loaded = true
  }

  function removeActiveListener() {
    if (mql && mqlListener) {
      mql.removeEventListener('change', mqlListener)
    }
  }
</script>

<slot {matches} {loaded} />
