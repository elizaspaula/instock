import './WarehouseInvElement.scss'
import editIcon from '../../assets/icons/edit-24px.svg'
import chevronIcon from '../../assets/icons/chevron_right-24px.svg'
import deleteIcon from '../../assets/icons/delete_outline-24px.svg'
import { Link } from 'react-router-dom'

//
// Renders a single, responsive inventory item card for the WarehouseDetails component
//
function WarehouseInvElement({itemName, category, status, quantity, id, showDeleteModal}) {
  return (
    <li className="inventory-item body-medium">
      <div className="inventory-item__details">
        <div className="inventory-item__details-block inventory-item__details-block--left">
          <div className="inventory-item__column inventory-item__item">
            <h4 className="inventory-item__label">Inventory item</h4>
            <Link className="inventory-item__text-block label" to={`/inventory/${id}`}>
              <h3 className="inventory-item__text inventory-item__text--item">
                {itemName}
              </h3>
              <img className="inventory-item__item-chevron" src={chevronIcon} alt="Back icon"/>
            </Link>
          </div>
          <div className="inventory-item__column inventory-item__category">
            <h4 className="inventory-item__label">Category</h4>
            <p className="inventory-item__text inventory-item__text--category">
              {category}
            </p>
          </div>
        </div>
        <div className="inventory-item__details-block inventory-item__details-block--right">
          <div className="inventory-item__column">
            <h4 className="inventory-item__label">Status</h4>
            <h4 className=
                {`
                  inventory-item__text
                  inventory-item__stock
                  ${status.toLowerCase() === "in stock" && "inventory-item__stock--true"}
                `}
              >{status}</h4>
          </div>
          <div className="inventory-item__column inventory-item__quantity">
            <h4 className="inventory-item__label">Qty</h4>
            <p className="inventory-item__text">{quantity}</p>
          </div>
        </div>
      </div>
      <div className="inventory-item__details--right">
        <div className="inventory-item__column inventory-item__quantity--tablet">
          <h4 className="inventory-item__label">Quantity</h4>
          <p className="inventory-item__text">{quantity}</p>
        </div>
        <div className="inventory-item__column inventory-item__actions">
          <button type="button" className="inventory-item__delete-button" onClick={() => {showDeleteModal(itemName, id)}}>
            <img
              className="inventory-item__action-icon"
              src={deleteIcon}
              alt="Delete icon"
            />
          </button>
          <Link to={`/inventory/edit/${id}`}>
            <img
              className="inventory-item__action-icon"
              src={editIcon}
              alt="Edit icon"
            />
          </Link>
        </div>
      </div>
    </li>
  )
}

export default WarehouseInvElement;