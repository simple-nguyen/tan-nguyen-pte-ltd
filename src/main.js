import './app.css'
import App from './App.svelte'

// Svelte 5 uses createRoot for mounting components
const app = App.mount({
  target: document.getElementById('app')
})

export default app
