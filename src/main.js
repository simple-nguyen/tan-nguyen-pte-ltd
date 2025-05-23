import './app.css'
import App from './App.svelte'
import { mount } from 'svelte'

// Correct Svelte 5 initialization pattern
const app = mount(App, {
  target: document.getElementById('app')
})

export default app
