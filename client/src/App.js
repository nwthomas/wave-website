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
  const [isMining, setIsMining] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const contractAbi = abi.abi;

  const handleGetAllWaves = React.useCallback(async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const waveContract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT_ADDRESS,
      contractAbi,
      signer
    );

    const waves = await waveContract.getAllWaves();
    const normalizedWaves = waves.map((wave) => {
      return {
        address: wave.waver,
        timestamp: new Date(wave.timestamp * 1000),
        message: wave.message,
      };
    });

    setWaves(normalizedWaves);
  }, [contractAbi]);

  const handleGetTotalWaves = React.useCallback(async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const waveContract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT_ADDRESS,
      contractAbi,
      signer
    );

    let count = await waveContract.getTotalWaves();
    setTotalWaves(count);
  }, [contractAbi]);

  const [waves, setWaves] = React.useState([]);

  React.useEffect(() => {
    checkIfWalletIsConnected();
    handleGetAllWaves();
    handleGetTotalWaves();
  }, [handleGetAllWaves, handleGetTotalWaves]);

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

    const waveTxn = await waveContract.wave("DUDE");
    setIsMining(true);

    await waveTxn.wait();
    setIsMining(false);

    let count = handleGetTotalWaves();
    setTotalWaves(count);

    handleGetAllWaves();
  };

  console.log({ waves });

  return (
    <>
      <GlobalStyles />
      <RootStyles>
        <h1>Hey, I'm Nathan 👋🏻</h1>
        {totalWaves ? <h3>{`Total waves sent: ${totalWaves} 👋🏻`}</h3> : null}
        <button onClick={handleWave}>Wave at me</button>
        <div>
          <ConnectWalletButton onClick={handleConnectWalletClick}>
            {account.length ? "Connect Wallet" : "Connected"}
          </ConnectWalletButton>
        </div>
        {isMining ? <p>Mining</p> : null}
        {waves.map((wave) => {
          const { address, timestamp, message } = wave;
          return (
            <WavesWrapper>
              <p>{`Wallet: ${address}`}</p>
              <p>{`Time: ${timestamp.toString()}`}</p>
              <p>{`Message: ${message}`}</p>
            </WavesWrapper>
          );
        })}
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
    margin-bottom: 30px;
  }

  > p {
    margin-top: 30px;
  }
`;

const ConnectWalletButton = styled.button`
  position: absolute;
  right: 20px;
  top: 20px;
  width: 150px;
`;

const WavesWrapper = styled.div`
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  max-width: 600px;
  padding: 3%;
  width: 100%;

  > p {
    padding-bottom: 10px;
  }

  > p:last-of-type {
    padding: 0;
  }
`;

export default App;
