import Modal from "react-modal";
import PropTypes from "prop-types";

function ModalMetamask({ isModalOpen, setIsModalOpen }) {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  let link;
  let linkText;
  let modalContent;

  if (
    /android/i.test(userAgent) ||
    (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream)
  ) {
    if (window.ethereum) {
      modalContent = "MetaMask is installed. Please connect to it.";
    } else {
      link = /android/i.test(userAgent)
        ? "https://play.google.com/store/apps/details?id=io.metamask"
        : "https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202";
      linkText = /android/i.test(userAgent)
        ? "MetaMask for Android"
        : "MetaMask for IOS";
      modalContent = (
        <>
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
        </>
      );
    }
  } else {
    link =
      "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en";
    linkText = "MetaMask for PC";
    modalContent = (
      <>
        For use this APP, please, install{" "}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="modal-link"
        >
          {linkText}
        </a>
        .
      </>
    );
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
      <p className="modal-content">{modalContent}</p>
    </Modal>
  );
}

export default ModalMetamask;

ModalMetamask.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
};
