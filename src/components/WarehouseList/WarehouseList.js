import "./WarehouseList.scss";
import sortIcon from '../../assets/icons/sort-24px.svg';
import WarehouseElement from "../WarehouseElement/WarehouseElement";


function WarehouseList({ warehouses, showDeleteModal }) {
  return (    
      <div className="wrapper">
          <div className="column-labelsWH">
            <div className="column-labelsWH__left column-labelsWH__left--wh">
              <div className="column-labelsWH__column column-labelsWH__wh">
                <h4 className="column-labelsWH__text">Warehouse</h4>
                <img className="column-labelsWH__sort-icon" src={sortIcon}/>
              </div>
              <div className="column-labelsWH__column column-labelsWH__address">
                <h4 className="column-labelsWH__text">Address</h4>
                <img className="column-labelsWH__sort-icon" src={sortIcon}/>
              </div>
              <div className="column-labelsWH__column column-labelsWH__contactName">
                <h4 className="column-labelsWH__text column-labelsWH__text--contName">Contact Name</h4>
                <img className="column-labelsWH__sort-icon" src={sortIcon}/>
              </div>
            </div>
            <div className="column-labelsWH__right column-labelsWH__right--wh">
              <div className="column-labelsWH__column column-labelsWH__contactInformation">
                <h4 className="column-labelsWH__text">Contact Information</h4>
                <img className="column-labelsWH__sort-icon" src={sortIcon}/>
              </div>
              <div className="column-labelsWH__column column-labelsWH__actions column-labelsWH__actions--wh">
                <h4 className="column-labelsWH__text">Actions</h4>
              </div>
            </div>
          </div>
        <ul className="warehouses-list">
          {
            warehouses.map((warehouse) => {
              return (
                <WarehouseElement
                  name={warehouse.name}
                  address={warehouse.address}
                  city={warehouse.city}
                  country={warehouse.country}
                  contactName={warehouse.contact.name}
                  contactPhone={warehouse.contact.phone}
                  contactEmail={warehouse.contact.email}
                  id={warehouse.id}
                  key={warehouse.id}
                  showDeleteModal={showDeleteModal}
                  />
              )})
          }
        </ul>
      </div>

  );
}

export default WarehouseList;
