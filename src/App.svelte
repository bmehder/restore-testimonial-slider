<script>
  import { TESTIMONIALS } from './testimonialsData'
  import { fly } from 'svelte/transition'

  export let speed = 3

  let testimonialNum = 0
  let timerId

  const goForward = () => {
    clearTimeout(timerId)
    testimonialNum < TESTIMONIALS.length - 1
      ? (testimonialNum += 1)
      : (testimonialNum = 0)
  }

  const goBack = () => {
    clearTimeout(timerId)
    testimonialNum > 0
      ? (testimonialNum -= 1)
      : (testimonialNum = TESTIMONIALS.length - 1)
  }

  const runTimer = () => {
    timerId = setTimeout(() => {
      goForward()
    }, speed * 1000)
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

  {#key testimonialNum}
    <blockquote use:runTimer in:fly={{ x: 400 }}>
      <p class="quote">"{TESTIMONIALS[testimonialNum].text}"</p>
      <cite>
        <a href={TESTIMONIALS[testimonialNum].url} target="_blank">
          <span>
            {#each Array(5) as item}
              <i class="fa fa-star" />
            {/each}
          </span>
        </a>
        <p>{TESTIMONIALS[testimonialNum].name}</p>
      </cite>
    </blockquote>
  {/key}

  <i class="fa fa-angle-right fa-2x" on:click={goForward} />
</aside>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  aside {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 4em;
    min-height: 150px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    overflow: hidden;
  }
  blockquote {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 2em;
    line-height: 1.5;
    font-style: italic;
    text-align: justify;
  }
  .quote {
    font-size: 1.2em;
  }
  cite {
    text-align: center;
  }
  span {
    display: flex;
    gap: 2px;
    min-width: 100px;
    padding-top: 0.5em;
  }
  p {
    margin: 0;
  }
  i {
    padding: 5px;
    background: #3fa3a7;
    color: white;
    border-radius: 4px;
    z-index: 10;
  }
  @media screen and (max-width: 600px) {
    aside {
      display: none;
    }
  }
</style>
