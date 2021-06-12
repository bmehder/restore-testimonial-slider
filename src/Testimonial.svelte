<script>
  import { fly } from 'svelte/transition'
  import { TESTIMONIALS } from './testimonialsData'

  export let testimonialIndex
  export let thisTestimonial
  export let horizontalSlideDirection
  export let speed
  export let timerId
  export let goForward

  $: thisTestimonial = TESTIMONIALS[testimonialIndex]
  $: isQuote = thisTestimonial.quote
  $: isCitation = thisTestimonial.citation
  $: isURL = thisTestimonial.url
  $: isStars = thisTestimonial.stars
  $: sanatizedStars = Math.floor(thisTestimonial.stars) || 0

  const runTimer = () => {
    timerId = setTimeout(() => {
      goForward()
    }, speed * 1000)
  }
</script>

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

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
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
    /* margin-top: 0.5em; */
    padding: 0.5em;
    /* background: hsl(182, 45%, 75%); */
    border-radius: 4px;
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
</style>
