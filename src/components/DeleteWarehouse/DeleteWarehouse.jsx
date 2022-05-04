import './DeleteWarehouse.scss';
import { Component } from "react";

class DeleteWarehouse extends Component {
  render() {
    const showHideClassName = this.props.show
      ? "delete-warehouse__container delete-warehouse__container--block"
      : "delete-warehouse__container delete-warehouse__container--none";

    return (
      <>
        <div className={showHideClassName}>
          <div className="delete-warehouse__wrapper">
            <div className="delete-warehouse__container--top">
              <h1 className="delete-warehouse__header">
                {" "}
                Delete {this.props.warehouseName}?
              </h1>
              <p className="delete-warehouse__text">
                Please confirm that you'd like to delete the{" "}
                {this.props.warehouseName} from the list of warehouses. You
                won't be able to undo this action.{" "}
              </p>
            </div>
            <div className="delete-warehouse__container--bottom">
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
                onClick={this.props.deleteWarehouse}
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

export default DeleteWarehouse;

