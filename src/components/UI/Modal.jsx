import { useState } from "react";
import PropTypes from "prop-types";
import "./Modal.scss";
export function Modal({ show, title, children }) {
  //Initatilisation ------------------
  //State ----------------------------
  //Handlers -------------------------
  //View -----------------------------
  return show ? (
    <div className="ModalOverlay">
      <div className="ModalPane">
        <header>
          <p>{title}</p>
        </header>
        <main>{children}</main>
      </div>
    </div>
  ) : null;
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.node,
  children: PropTypes.node,
};

export function useModal(isOpen, initialContent = null) {
  //Initialisation------------------
  //State-----------------------
  const [state, setState] = useState({ show: isOpen, content: initialContent });

  //Handlers ------
  const open = (content) => {
    setState({ show: true, content });
  };
  const close = () => setState({ ...state, show: false });

  // Return------------------
  return [state.show, state.content, open, close];
}

export default Modal;
