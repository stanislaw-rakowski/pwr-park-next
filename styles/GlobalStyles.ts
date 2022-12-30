import { createGlobalStyle } from 'styled-components'
import type { Theme } from './theme'

const GlobalStyles = createGlobalStyle<{ theme: Theme }>`
  html,
  body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    height: 100%;
  }

  #__next {
    height: 100%;
  }

  *,
  *::before, 
  *::after {
      box-sizing: inherit;
  }
`

export default GlobalStyles
