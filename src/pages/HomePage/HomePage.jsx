import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import Modal from "react-modal";
import Web3 from "web3";
import Web3Modal from "web3modal";

import {
  setWalletAddress,
  setBalance,
  setIsWalletConnected,
} from "../../redux/walletSlice.js";

import Logo from "../../components/logo/Logo.jsx";
import ModalMetamask from "../../components/ModalMetamask/ModalMetamask.jsx";
import ConnectWalletButton from "../../components/ConnectWalletButton/ConnectWalletButton.jsx";
import TransferForm from "../../components/TransferForm/TransferForm.jsx";

Modal.setAppElement("#root");

const web3Modal = new Web3Modal({
  network: "mainnet", 
  cacheProvider: true, 
  providerOptions: {}, 
});

function HomePage() {
  const dispatch = useDispatch();

  const walletAddress = useSelector((state) => state.wallet.walletAddress);
  const balance = useSelector((state) => state.wallet.balance);
  const isWalletConnected = useSelector(
    (state) => state.wallet.isWalletConnected
  );
  const [transferAddress, setTransferAddress] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchBalance = useCallback(
    async (web3, address) => {
      const balanceWei = await web3.eth.getBalance(address);
      const balanceEth = web3.utils.fromWei(balanceWei, "ether");
      const exactBalance = Math.floor(balanceEth * 1000) / 1000;
      dispatch(setBalance(exactBalance.toFixed(3)));
    },
    [dispatch]
  );

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length !== 0) {
          const web3 = new Web3(window.ethereum);
          const address = accounts[0];
          dispatch(setIsWalletConnected(true));
          dispatch(setWalletAddress(address));
          fetchBalance(web3, address);
        } else {
          setIsModalOpen(true);
        }
      } else {
        setIsModalOpen(true);
      }
    };
    checkWalletConnection();
  }, [fetchBalance, dispatch]);

  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      const address = accounts[0];

      if (address) {
        dispatch(setIsWalletConnected(true));
        dispatch(setWalletAddress(address));
        fetchBalance(web3, address);
      }
    } catch (e) {
      console.log("User rejected request");
    }
  };

  const handleTransfer = async () => {
    if (!isWalletConnected) {
      Notify.warning("Please connect your wallet first");
      return;
    }

    const web3 = new Web3(web3Modal.cachedProvider);
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];

    try {
      await web3.eth.sendTransaction({
        from: address,
        to: transferAddress,
        value: web3.utils.toWei(transferAmount, "ether"),
        gas: 21000,
        gasPrice: web3.utils.toWei("50", "gwei"),
      });

      Notify.success("Transfer successful");
      setTransferAddress("");
      setTransferAmount("");
      fetchBalance(web3, address);
    } catch (error) {
      console.error(error);
      Notify.failure("Transfer failed");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Logo />
        <ConnectWalletButton
          isWalletConnected={isWalletConnected}
          walletAddress={walletAddress}
          balance={balance}
          connectWallet={connectWallet}
        />
      </header>
      <main className="App-main">
        <h1 className="App-title">My Wallet App</h1>
        {isWalletConnected && (
          <TransferForm
            transferAddress={transferAddress}
            setTransferAddress={setTransferAddress}
            transferAmount={transferAmount}
            setTransferAmount={setTransferAmount}
            handleTransfer={handleTransfer}
          />
        )}
        <ModalMetamask
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </main>
    </div>
  );
}

export default HomePage;
