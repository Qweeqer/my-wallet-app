import Modal from "react-modal";
import PropTypes from "prop-types";

function ModalMetamask({ isModalOpen, setIsModalOpen }) {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  let link;
  let linkText;

  if (/android/i.test(userAgent)) {
    link = "https://play.google.com/store/apps/details?id=io.metamask";
    linkText = "MetaMask for Android";
  } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    link =
      "https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202";
    linkText = "MetaMask for IOS";
  } else {
    link =
      "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en";
    linkText = "MetaMask for PC";
  }

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
      className="metamask-modal"
      contentLabel="MetaMask Install Modal"
    >
      <button
        className="modal-close-button"
        onClick={() => setIsModalOpen(false)}
      >
        Close
      </button>
      <h2 className="modal-title">You must install MetaMask</h2>
      <p className="modal-content">
        For use thise APP, please, install{" "}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="modal-link"
        >
          {linkText}
        </a>
        .
      </p>
    </Modal>
  );
}

export default ModalMetamask;

ModalMetamask.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
};
