import { css } from "styled-components";

const GlobalStyle = css`
  * {
    box-sizing: border-box;
  }
  html {
    font-size: 62.5%;
  }
  html,
  body {
    background-color: #fafafa;
  }
  html,
  body {
    font-family: "Work Sans", -apple-system, BlinkMacSystemFont, Segoe UI,
      Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol";
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  h1,
  h2,
  h3,
  h4,
  h5 {
    line-height: 1.8;
    margin-bottom: 30px;
  }
  h1 {
    font-size: 4rem;
  }
  h2 {
    font-size: 3rem;
  }
  h3 {
    font-size: 1.6rem;
  }

  button {
    background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);
    border-radius: 15px;
    border: none;
    font-size: 1.6rem;
    height: 40px;
    width: 200px;

    &:hover {
      cursor: pointer;
      border: 1px solid lightgray;
    }
  }
`;

export default GlobalStyle;
