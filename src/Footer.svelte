<script>
  export let isShowNumber
  export let testimonialIndex
  export let length
</script>

{#if isShowNumber}
  <footer>
    {testimonialIndex + 1 + ' / ' + length}
  </footer>
{/if}

<style>
  footer {
    padding: 1em;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    text-align: center;
  }
</style>
