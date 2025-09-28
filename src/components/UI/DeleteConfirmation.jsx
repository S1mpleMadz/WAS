import PropTypes from "prop-types";
import { Modal } from "./Modal";
import Actions from "./Actions";

export default function DeleteConfirmation({ show, itemType, itemName, onConfirm, onCancel }) {
  // View --------------------------------------------------------

  return (
    <Modal show={show} title={`Confirm Deletion`}>
      <p>
        Are you sure you want to delete this {itemType}?{itemName && <strong> ({itemName})</strong>}
      </p>
      <p className="warning">This action cannot be undone.</p>
      <Actions.Tray>
        <Actions.Yes onClick={onConfirm} showText buttonText="Yes, Delete" />
        <Actions.No onClick={onCancel} showText buttonText="No, Cancel" />
      </Actions.Tray>
    </Modal>
  );
}

DeleteConfirmation.propTypes = {
  show: PropTypes.bool.isRequired,
  itemType: PropTypes.string.isRequired,
  itemName: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
