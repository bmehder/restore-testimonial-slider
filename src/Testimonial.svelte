<script>
  import { fly } from 'svelte/transition'
  import { circInOut } from 'svelte/easing'
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

  const runTimer = () => (timerId = setTimeout(() => goForward(), speed * 1000))

  const handleMouseenter = () => clearTimeout(timerId)

  const handleMouseleave = () => runTimer()
</script>

{#key testimonialIndex}
  <blockquote
    use:runTimer
    on:mouseenter={handleMouseenter}
    on:mouseleave={handleMouseleave}
    in:fly={{ x: horizontalSlideDirection, easing: circInOut }}
  >
    {#if isQuote}
      <p><q>{thisTestimonial.quote}</q></p>
    {/if}
    <cite>
      {#if isURL}
        <a href={thisTestimonial.url} target="_blank">
          <span>
            {#each Array(sanatizedStars) as _}
              <i class="fa fa-star" />
            {/each}
          </span>
        </a>
      {:else}
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
  }
  blockquote {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 2em;
    line-height: 1.5;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    font-style: italic;
  }
  p:first-child {
    font-size: 1.2em;
  }
  cite {
    text-align: center;
    margin: auto;
  }
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2px;
    min-width: 100px;
    padding: 0.5em;
    border-radius: 4px;
  }
  span i {
    padding: 5px;
    background: #3fa3a7;
    color: white;
    border-radius: 4px;
    transition: transform 200ms ease-in-out;
  }
  @media screen and (max-width: 600px) {
    blockquote {
      flex-direction: column;
    }
  }
</style>
