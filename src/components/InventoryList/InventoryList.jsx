import "./InventoryList.scss";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import chevronRight from "../../assets/icons/chevron_right-24px.svg";
import sortIcon from "../../assets/icons/sort-24px.svg";
import { Link } from "react-router-dom";

function InventoryList({ inventories, showDeleteModal }) {
  return (
    <>
      <ul className="items  mobile">
        {inventories.map((inventory) => (
          <li className="items__list" key={inventory.id}>
            <div className="items__wrapper">
              <div className="items__content">
                <h4 className="items__header">inventory item</h4>
                <Link to={`/inventory/${inventory.id}`} className="items__name">
                  {inventory.itemName}
                  <img src={chevronRight} alt="chevron right" />
                </Link>
              </div>
              <div className="items__content">
                <h4 className="items__header">status</h4>
                <div
                  className={`items__tag ${
                    inventory.status === "In Stock"
                      ? "items__green"
                      : "items__red"
                  }`}
                >
                  <h3 className="items__status">{inventory.status}</h3>
                </div>
              </div>
            </div>
            <div className="items__wrapper">
              <div className="items__content">
                <h4 className="items__header">category</h4>
                <p className="items__category">{inventory.category}</p>
              </div>
              <div className="items__content">
                <h4 className="items__header">qtd</h4>
                <p className="items_qtd">{inventory.quantity}</p>
              </div>
            </div>
            <div className="items__wrapper">
              <div className="items__content"></div>
              <div className="items__content">
                <h4 className="items__header">warehouse</h4>
                <p className="items__warehouse">{inventory.warehouseName}</p>
              </div>
            </div>
            <div className="items__buttons">
              <button
                className="items__button"
                type="button"
                onClick={() => {
                  showDeleteModal(inventory.itemName, inventory.id);
                }}
              >
                <img
                  className="items__icon"
                  src={deleteIcon}
                  alt="delete-icon"
                />
              </button>
              <Link
                to={`/inventory/edit/${inventory.id}`}
                className="items__button"
              >
                <img className="items__icon" src={editIcon} alt="edit-icon" />
              </Link>
            </div>
          </li>
        ))}
      </ul>

      <table className="table body-medium tablet-desktop">
        <thead>
          <tr className="table__head">
            <th className="table__header">
              <div className="table__label">
                <h4>inventory item</h4>
                <img
                  className="column-labels__sort-icon"
                  src={sortIcon}
                  alt="sort icon"
                />
              </div>
            </th>
            <th className="table__header">
              <div className="table__label">
                <h4> category </h4>
                <img
                  className="column-labels__sort-icon"
                  src={sortIcon}
                  alt="sort icon"
                />
              </div>
            </th>
            <th className="table__header">
              <div className="table__label">
                <h4> status</h4>
                <img
                  className="column-labels__sort-icon"
                  src={sortIcon}
                  alt="sort icon"
                />
              </div>
            </th>
            <th className="table__header">
              <div className="table__label">
                <h4> qtd</h4>
                <img
                  className="column-labels__sort-icon"
                  src={sortIcon}
                  alt="sort icon"
                />
              </div>
            </th>
            <th className="table__header">
              <div className="table__label">
                <h4> warehouse</h4>
                <img
                  className="column-labels__sort-icon"
                  src={sortIcon}
                  alt="sort icon"
                />
              </div>
            </th>
            <th className="table__header">
              <div className="table__label">
                <h4>actions </h4>
                <img
                  className="column-labels__sort-icon"
                  src={sortIcon}
                  alt="sort icon"
                />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {inventories.map((inventory) => (
            <tr className="table__row" key={inventory.id}>
              <td>
                <Link
                  to={`/inventory/${inventory.id}`}
                  className="table__data name"
                >
                  {inventory.itemName}
                  <img src={chevronRight} alt="chevron right" />
                </Link>
              </td>
              <td className="table__data">{inventory.category}</td>
              <td className="table__data">
                <div
                  className={`table__tag ${
                    inventory.status === "In Stock"
                      ? "table__green"
                      : "table__red"
                  }`}
                >
                  <h3 className="table__status">{inventory.status}</h3>
                </div>
              </td>
              <td className="table__data">{inventory.quantity}</td>
              <td className="table__data">{inventory.warehouseName}</td>
              <td className="table__data icons">
                <button
                  className="items__button"
                  type="button"
                  onClick={() => {
                    showDeleteModal(inventory.itemName, inventory.id);
                  }}
                >
                  <img
                    className="items__icon"
                    src={deleteIcon}
                    alt="delete-icon"
                  />
                </button>
                <Link
                  to={`/inventory/edit/${inventory.id}`}
                  className="items__button"
                >
                  <img className="items__icon" src={editIcon} alt="edit-icon" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default InventoryList;
