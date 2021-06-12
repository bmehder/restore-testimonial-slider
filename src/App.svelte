<script>
  import { TESTIMONIALS } from './testimonialsData'
  import { fly } from 'svelte/transition'

  export let speed = 3
  export let showNumber = false

  let testimonialIndex = 0
  let horizontalSlideDirection = 400
  let timerId

  $: thisTestimonial = TESTIMONIALS[testimonialIndex]
  $: isQuote = thisTestimonial.quote
  $: isCitation = thisTestimonial.citation
  $: isURL = thisTestimonial.url
  $: isStars = thisTestimonial.stars
  $: sanatizedStars = Math.floor(thisTestimonial.stars) || 0

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

  {#key testimonialIndex}
    <blockquote use:runTimer in:fly={{ x: horizontalSlideDirection }}>
      {#if isQuote}
        <p class="quote">"{thisTestimonial.quote}"</p>
      {/if}
      <cite>
        {#if isURL}
          <a href={thisTestimonial.url} target="_blank">
            {#if isStars}
              <span>
                {#each Array(sanatizedStars) as _}
                  <i class="fa fa-star" />
                {/each}
              </span>
            {/if}
          </a>
        {:else if isStars}
          <span>
            {#each Array(sanatizedStars) as _}
              <i class="fa fa-star" />
            {/each}
          </span>
        {/if}
        {#if isCitation}
          <p>{thisTestimonial.citation}</p>
        {/if}
      </cite>
    </blockquote>
  {/key}

  <i class="fa fa-angle-right fa-2x" on:click={goForward} />
</aside>

{#if showNumber}
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
    justify-content: center;
    align-items: center;
    gap: 2px;
    min-width: 100px;
    margin-top: 0.5em;
    padding: 0.5em;
    background: hsl(182, 45%, 75%);
    border-radius: 4px;
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
