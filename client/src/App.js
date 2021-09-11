import * as React from "react";
import styled from "styled-components";
import GlobalStyles from "./styles";

const checkIfWalletIsConnected = () => {
  const { ethereum } = window;

  if (!ethereum) {
    console.log("Connect to metamask!");
    return;
  }

  ethereum.request({ method: "eth_accounts" }).then((accounts) => {
    if (accounts.length <= 0) {
      const accountOne = accounts[0];
      console.log("Found an authorized account", accountOne);
      return accountOne;
    }

    console.log("no authorized account found");
    return;
  });

  console.log("We have the ethereum object", ethereum);
  return true;
};

function App() {
  const [account, setAccount] = React.useState("");
  React.useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const handleConnectWalletClick = () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please download and set up Metamask");
    }

    ethereum.request({ method: "eth_requestAccounts" }).then((accounts) => {
      if (accounts.length !== 0) {
        console.log("Connected", accounts[0]);
        setAccount(account);
      } else {
        console.log("No authorized account found");
      }
    });
  };

  return (
    <>
      <GlobalStyles />
      <RootStyles>
        <h1>Hey, I'm Nathan! 👋🏻</h1>
        <button>Wave at me</button>
        <div>
          <ConnectWalletButton onClick={handleConnectWalletClick}>
            {account.length ? "Connect Wallet" : "Connected!"}
          </ConnectWalletButton>
        </div>
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
  position: relative;
  width: 100%;
`;

const ConnectWalletButton = styled.button`
  position: absolute;
  right: 20px;
  top: 20px;
  width: 150px;
`;

export default App;
