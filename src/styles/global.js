import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    font-size: 62.5%;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body { 
    background-color: ${({ theme }) => theme.COLORS.BLUE};
    color: ${({ theme }) => theme.COLORS.BLACK};
    -webkit-font-smoothing: antialiased;
  }
  
  body, input, button, textarea, select {
     font-family: "Fredoka", sans-serif;
     color: ${({ theme }) => theme.COLORS.BLACK };
     font-size: 2rem;
     outline: none;
  }

  option {
    background-color: ${({ theme }) => theme.COLORS.WHITE};
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.COLORS.BLACK }
  }

  h1 {
    font-weight: 600;
  }

  button, a {
    cursor: pointer;
    border: none;
    transition: filter 0.2s;
  }

  button:hover, a:hover {
    filter: brightness(0.9);
  }

  ul, li {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;

export default GlobalStyle;
