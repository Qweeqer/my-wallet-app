import { useState } from "react";
import PropTypes from "prop-types";

function ConnectWalletButton({
  isWalletConnected,
  walletAddress,
  balance,
  connectWallet,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const truncatedWalletAddress =
    walletAddress &&
    `${walletAddress.slice(0, 5)}...${walletAddress.slice(-4)}`;

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return isWalletConnected ? (
    <div
      className="connectWallet"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="walletBalance">{balance} ETH</span>
      <span className="walletAddress">
        {isHovered ? walletAddress : truncatedWalletAddress}
      </span>
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
