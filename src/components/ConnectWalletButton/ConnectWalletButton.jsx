import PropTypes from "prop-types";

function ConnectWalletButton({
  isWalletConnected,
  walletAddress,
  balance,
  connectWallet,
}) {
  return isWalletConnected ? (
    <div className="connectWallet">
      <span className="walletBalance">{balance} ETH</span>
      <span className="walletAddress">{walletAddress}</span>
    </div>
  ) : (
    <button className="connectButton" onClick={connectWallet}>
      Connect wallet
    </button>
  );
}

ConnectWalletButton.propTypes = {
  isWalletConnected: PropTypes.bool.isRequired,
  walletAddress: PropTypes.string,
  balance: PropTypes.string,
  connectWallet: PropTypes.func.isRequired,
};

export default ConnectWalletButton;
