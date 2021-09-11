import * as React from "react";
import { ethers } from "ethers";
import styled from "styled-components";
import GlobalStyles from "./styles";
import abi from "./utils/wave";

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
  const [totalWaves, setTotalWaves] = React.useState(null);
  const contractAbi = abi.abi;

  React.useEffect(() => {
    checkIfWalletIsConnected();
  }, [account]);

  const handleConnectWalletClick = () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please download and set up Metamask");
    }

    ethereum.request({ method: "eth_requestAccounts" }).then((accounts) => {
      if (accounts.length >= 0) {
        console.log("Connected", accounts[0]);
        setAccount(account);
      } else {
        console.log("No authorized account found");
      }
    });
  };

  const handleWave = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const waveContract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT_ADDRESS,
      contractAbi,
      signer
    );

    const waveTxn = await waveContract.wave();
    console.log("Mining...", waveTxn.hash);

    await waveTxn.wait();
    console.log("Mined -- ", waveTxn.hash);

    let count = await waveContract.getTotalWaves();
    setTotalWaves(count);
    console.log("Retrieved total wave count", count.toNumber());
  };

  return (
    <>
      <GlobalStyles />
      <RootStyles>
        <h1>Hey, I'm Nathan! 👋🏻</h1>
        <button onClick={handleWave}>Wave at me</button>
        <div>
          <ConnectWalletButton onClick={handleConnectWalletClick}>
            {account.length ? "Connect Wallet" : "Connected"}
          </ConnectWalletButton>
        </div>
        {totalWaves ? <h3>{`Total waves: ${totalWaves}`}</h3> : null}
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

  > h3 {
    margin-top: 30px;
  }
`;

const ConnectWalletButton = styled.button`
  position: absolute;
  right: 20px;
  top: 20px;
  width: 150px;
`;

export default App;
