<script>
  import { TESTIMONIALS } from './testimonialsData'
  import Testimonial from './Testimonial.svelte'
  import Controls from './Controls.svelte'
  import Footer from './Footer.svelte'

  export let speed = 3
  export let isShowNumber = false

  let testimonialIndex = 0
  let horizontalSlideDirection = 400
  let timerId = null

  const changeDirection = xOffset => (horizontalSlideDirection = xOffset)

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
  <Controls direction="left" on:click={goBack} />
  <Testimonial
    bind:testimonialIndex
    bind:timerId
    {horizontalSlideDirection}
    {speed}
    {goForward}
  />
  <Controls direction="right" on:click={goForward} />
</aside>

<Footer {isShowNumber} {testimonialIndex} length={TESTIMONIALS.length} />

<style>
  aside {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2em;
    min-height: 150px;
    margin: 0;
    padding: 1em;
    background: hsl(182, 45%, 85%);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    border: 4px solid hsl(182, 45%, 50%);
    border-radius: 24px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.14);
    overflow: hidden;
  }
  @media screen and (max-width: 600px) {
    aside {
      width: 320px;
      margin: auto;
    }
  }
</style>
