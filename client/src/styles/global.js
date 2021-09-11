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
    font-family: Helvetica, Arial, sans-serif, "Apple Color Emoji",
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

  p {
    font-size: 1.6rem;
  }

  button {
    background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);
    border-radius: 7px;
    border: none;
    font-size: 1.6rem;
    height: 40px;
    width: 200px;
    -webkit-box-shadow: 0px 9px 16px -4px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0px 9px 16px -4px rgba(0, 0, 0, 0.1);
    box-shadow: 0px 9px 16px -4px rgba(0, 0, 0, 0.1);
    transition: 0.3s transform, 0.3s box-shadow;

    &:hover {
      cursor: pointer;
      transform: translateY(-1px);
      -webkit-box-shadow: 0px 9px 16px -4px rgba(0, 0, 0, 0.17);
      -moz-box-shadow: 0px 9px 16px -4px rgba(0, 0, 0, 0.17);
      box-shadow: 0px 9px 16px -4px rgba(0, 0, 0, 0.17);
    }
  }
`;

export default GlobalStyle;
