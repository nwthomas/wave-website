import styled from "styled-components";
import GlobalStyles from "./styles";

function App() {
  return (
    <>
      <GlobalStyles />
      <RootStyles>
        <h1>Hey, I'm Nathan! 👋🏻</h1>
        <button>Wave at me</button>
      </RootStyles>
    </>
  );
}

const RootStyles = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 50px 5%;
  width: 100%;
`;

export default App;
