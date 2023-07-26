import { useState } from "react";
import PropTypes from "prop-types";
import { Loader } from "../Loader/Loader";

function TransferForm({
  transferAddress,
  setTransferAddress,
  transferAmount,
  setTransferAmount,
  handleTransfer,
}) {
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [isValidAmount, setIsValidAmount] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddressChange = (e) => {
    const newAddress = e.target.value;
    setTransferAddress(newAddress);
    const regex = /^0x[a-fA-F0-9]{40}$/;
    setIsValidAddress(newAddress && regex.test(newAddress));
  };

  const handleAmountChange = (e) => {
    const newAmount = e.target.value;
    setTransferAmount(newAmount);
    const regex = /^(0\.\d{1,6}|[1-9]\d{0,4}(\.\d{1,6})?|100000)$/;
    setIsValidAmount(
      newAmount &&
        regex.test(newAmount) &&
        parseFloat(newAmount) >= 0.000001 &&
        parseFloat(newAmount) <= 100000
    );
  };

  const handleClick = async () => {
    setIsLoading(true);
    await handleTransfer();
    setIsLoading(false);
  };

  return (
    <div className="wallet-info">
      <div className="transfer-input-wrapper">
        <label className={`transfer-label ${transferAddress ? "active" : ""}`}>
          Transfer address
        </label>
        <input
          className="transfer-input"
          type="text"
          value={transferAddress}
          onChange={handleAddressChange}
        />
      </div>
      {!isValidAddress && transferAddress && (
        <p className="error-text">Invalid Ethereum address format.</p>
      )}
      <div className="transfer-input-wrapper">
        <label className={`transfer-label ${transferAmount ? "active" : ""}`}>
          Transfer amount
        </label>
        <input
          className="transfer-input"
          type="text"
          value={transferAmount}
          onChange={handleAmountChange}
        />
      </div>
      {!isValidAmount && transferAmount && (
        <p className="error-text">
          Invalid transfer amount format. The sum must be greater than zero and
          up to 3 characters after the period. Example: 0.100
        </p>
      )}
      <button
        className={`transfer-button ${
          !(isValidAddress && isValidAmount) ? "disabled-button" : ""
        }`}
        onClick={handleClick}
        disabled={!(isValidAddress && isValidAmount) || isLoading}
      >
        {isLoading ? <Loader /> : "Transfer"}
      </button>
    </div>
  );
}

TransferForm.propTypes = {
  transferAddress: PropTypes.string.isRequired,
  setTransferAddress: PropTypes.func.isRequired,
  transferAmount: PropTypes.string.isRequired,
  setTransferAmount: PropTypes.func.isRequired,
  handleTransfer: PropTypes.func.isRequired,
};

export default TransferForm;
