<script>
  import { TESTIMONIALS } from './testimonialsData'
  import Testimonial from './Testimonial.svelte'

  export let speed = 3
  export let isShowNumber = false

  let testimonialIndex = 0
  let horizontalSlideDirection = 400
  let timerId = null

  const changeDirection = xNumber => {
    horizontalSlideDirection = xNumber
  }

  const goForward = () => {
    clearTimeout(timerId)
    changeDirection(-400)
    testimonialIndex < TESTIMONIALS.length - 1
      ? (testimonialIndex += 1)
      : (testimonialIndex = 0)
  }

  const goBack = () => {
    clearTimeout(timerId)
    changeDirection(400)
    testimonialIndex > 0
      ? (testimonialIndex -= 1)
      : (testimonialIndex = TESTIMONIALS.length - 1)
  }
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
    integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  />
</svelte:head>

<aside>
  <i class="fa fa-angle-left fa-2x" on:click={goBack} />
  <Testimonial
    bind:testimonialIndex
    bind:timerId
    {horizontalSlideDirection}
    {speed}
    {goForward}
  />
  <i class="fa fa-angle-right fa-2x" on:click={goForward} />
</aside>

{#if isShowNumber}
  <footer>{testimonialIndex + 1 + ' / ' + TESTIMONIALS.length}</footer>
{/if}

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  }
  aside {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 3em;
    min-height: 150px;
    overflow: hidden;
  }
  i {
    padding: 5px;
    background: #3fa3a7;
    color: white;
    border-radius: 4px;
    z-index: 10;
    cursor: pointer;
    transition: transform 200ms ease-in-out;
  }
  i:hover {
    transform: scale(1.1);
  }
  footer {
    text-align: center;
  }
  @media screen and (max-width: 600px) {
    aside {
      display: none;
    }
  }
</style>
