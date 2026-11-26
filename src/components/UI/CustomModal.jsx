import React from "react";
import Modal from "react-modal";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(36, 27, 20, 0.45)",
    backdropFilter: "blur(3px)",
    zIndex: 1000,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    borderRadius: "1.5rem",
    padding: "1.75rem",
    width: "min(92vw, 26rem)",
    boxShadow: "0 24px 48px rgba(36, 27, 20, 0.22)",
  }
};

const CustomModal = ({ isOpen, onRequestClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      ariaHideApp={false}
      closeTimeoutMS={150}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
