// Imports
// Component imports
import Nav from '@/components/Nav'

// Styles imports
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Nav />
      <Component {...pageProps} />
    </>
  )
}
