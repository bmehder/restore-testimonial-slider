import App from './App.svelte'

var app = new App({
  target: document.querySelector('#home-testimonials'),
  props: {
    speed: 6,
    showNumber: true,
  },
})

export default app
