<script>
  export let direction = null
</script>

<i class="fa fa-angle-{direction} fa-2x" on:click />

<style>
  i {
    padding: 5px;
    color: white;
    border-radius: 4px;
    z-index: 10;
    cursor: pointer;
    transition: transform 200ms ease-in-out;
  }
  i:hover {
    transform: scale(1.5);
  }
</style>
