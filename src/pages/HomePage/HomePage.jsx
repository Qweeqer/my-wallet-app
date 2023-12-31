import { useState, useEffect, useCallback } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import Web3 from "web3";

import {
  setWalletAddress,
  setBalance,
  setIsWalletConnected,
} from "../../redux/walletSlice.js";
import Logo from "../../components/logo/Logo.jsx";
import ModalMetamask from "../../components/ModalMetamask/ModalMetamask";
import ConnectWalletButton from "../../components/ConnectWalletButton/ConnectWalletButton";
import TransferForm from "../../components/TransferForm/TransferForm";

Modal.setAppElement("#root");

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
    if (typeof window.ethereum === "undefined" || !window.ethereum) {
      setIsModalOpen(true);
    } else if (walletAddress) {
      setIsModalOpen(false);
      const web3 = new Web3(window.ethereum);
      fetchBalance(web3, walletAddress);
    }
  }, [fetchBalance, walletAddress]);

  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined" || !window.ethereum) {
      setIsModalOpen(true);
      return;
    }
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const web3 = new Web3(window.ethereum);
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

    const web3 = new Web3(window.ethereum);
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
