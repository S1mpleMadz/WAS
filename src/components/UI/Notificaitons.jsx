import { Modal } from "./Modal";
import Action from "./Actions";
import "./Notifications.scss";
import PropTypes from "prop-types";

export function Alert({ show, message, onConfirm, onDismiss }) {
  // Initialisation ----------------------------------------------
  // State -------------------------------------------------------
  // Handlers ----------------------------------------------------
  // View --------------------------------------------------------
  return (
    <div className="notificationAlert">
      <Modal show={show} title="Added">
        <p>{message}</p>

        <Action.Tray>
          <Action.Dismiss showText onClick={onDismiss} />
        </Action.Tray>
      </Modal>
    </div>
  );
}

Alert.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.string,
  onConfirm: PropTypes.func,
  onDismiss: PropTypes.func,
};
export function Confirm({ show, message, onConfirm, onDismiss }) {
  // Initialisation ----------------------------------------------
  // State -------------------------------------------------------
  // Handlers ----------------------------------------------------
  const handleDismiss = () => {
    onConfirm();
    onDismiss();
  };
  // View --------------------------------------------------------
  return (
    <div className="notificationConfirm">
      <Modal show={show} title="Confirm requested" modalPaneClass="notificationConfirm">
        <p>{message}</p>
        <Action.Tray>
          <Action.Yes showText onClick={handleDismiss} />
          <Action.Dismiss showText onClick={onDismiss} />
        </Action.Tray>
      </Modal>
    </div>
  );
}

Confirm.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.string,
  onConfirm: PropTypes.func,
  onDismiss: PropTypes.func,
};

export function Error({ show, message, onDismiss }) {
  // Initialisation ----------------------------------------------
  // State -------------------------------------------------------
  // Handlers ----------------------------------------------------
  // View --------------------------------------------------------
  return (
    <div className="notificationError">
      <Modal show={show} title="Error detected" modalPaneClass="notificationError">
        <p>{message}</p>

        <Action.Tray>
          <Action.Dismiss showText onClick={onDismiss} />
        </Action.Tray>
      </Modal>
    </div>
  );
}

Error.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.string,
  onDismiss: PropTypes.func,
};
