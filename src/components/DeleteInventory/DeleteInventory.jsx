import "./DeleteInventory.scss";
import React from "react";

class DeleteInventory extends React.Component {
  render() {
    const showHideClassName = this.props.show
      ? "delete-inventory__container delete-warehouse__container--block"
      : "delete-inventory__container delete-warehouse__container--none";

    return (
      <>
        <div className={showHideClassName}>
          <div className="delete-inventory__wrapper">
            <div className="delete-inventory__container--top">
              <h1 className="delete-inventory__header">
                Delete {this.props.inventoryName} inventory item?
              </h1>
              <p className="delete-inventory__text">
                Please confirm that you'd like to delete the{" "}
                {this.props.inventoryName} from the list of inventory. You won't
                be able to undo this action.
              </p>
            </div>
            <div className="delete-inventory__container--bottom">
              <button
                type="button"
                className="delete-inventory__cancel-btn"
                onClick={this.props.hideDeleteModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="delete-inventory__delete-btn"
                onClick={this.props.deleteInventory}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default DeleteInventory;
