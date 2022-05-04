import axios from 'axios';
import './WarehouseDetails.scss';
import { Component } from "react";
import { Link } from "react-router-dom";
import EditButton from '../EditButton/EditButton';
import sortIcon from '../../assets/icons/sort-24px.svg';
import backIcon from '../../assets/icons/arrow_back-24px.svg';
import WarehouseInvElement from '../WarehouseInvElement/WarehouseInvElement';
import DeleteInventory from '../DeleteInventory/DeleteInventory';

//
// Renders the WarehouseDetails component, responsible for displaying a singular warehouses' 
// details (by ID in the URL params), as well as all current inventory for that warehouse.
//
class WarehouseDetails extends Component {
  state = {
    warehouse: {},
    warehouseInventory: [],
    show: false,
    toDelete: {},
  }

  // Displays the delete modal component and queue an item for delete in state -
  // passed down to the delete button in each inventory item card
  showDeleteModal = (name, id) => {
    this.setState({ show: true, toDelete: { name: name, id: id } });
  };

  // Clears the InventoryDelete modal from the screen -
  // passed down as to modal component's "Cancel" button
  hideDeleteModal = () => {
    this.setState({ show: false, toDelete: {} });
  };

  // Deletes a single inventory item from the API via an items ID queued in state
  deleteInventory = () => {
    let itemID = this.state.toDelete.id;
    return axios
      .delete(`${process.env.REACT_APP_API_URL}/inventory/${itemID}`)
      .then(() => {
        this.hideDeleteModal();
        this.getInventoryByWarehouseId();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Function to fetch a list of inventory items specific to a single Warehouse, 
  // indicated by ID
  getInventoryByWarehouseId = () => {
    let warehouseID = this.props.match.params.id;
    axios
      .get(`${process.env.REACT_APP_API_URL}/inventory/warehouse/${warehouseID}`)
      .then( (res) => {
        this.setState(
          {
            warehouseInventory: res.data
          }
        )
      })
      .catch( (result) => {
        console.log(result);
      })
  }

  // Function to fetch a single Warehouse's details via an ID in the URL params
  getWarehouseById = () => {
    let currentID = this.props.match.params.id;
    axios
      .get(`${process.env.REACT_APP_API_URL}/warehouses/${currentID}`)
      .then( (res) => {
        this.setState(
          {
            warehouse: res.data,
          }
        )
        this.getInventoryByWarehouseId(currentID);
      })
      .catch( (result) => {
        console.log(result);
      })
  }

  // Upon mounting, call getWarehouseById to fetch all required details to display component
  componentDidMount = () => {
    this.getWarehouseById();
  }

  render = () => {
    return (
      <>
        {this.state.warehouse.id ? (
          <>
          <div className='details-subheader'>
            <div className='details-subheader__block'>
              <Link className='details-subheader__back-link' to="/">
                <img className="details-subheader__back-link-icon" src={backIcon} alt="Back arrow"/>
              </Link>
              <h1 className='details-subheader__title'>{this.state.warehouse.name}</h1>
            </div>
            < EditButton route={`/warehouses/edit/${this.state.warehouse.id}`}/>
          </div>
          <div className="details body-medium">
            <div className="details__address">
              <h4 className="details__title">Warehouse address:</h4>
              <p className="details__text">{`${this.state.warehouse.address},`}<br/>{`${this.state.warehouse.city}, ${this.state.warehouse.country}`}</p>
            </div>
            <div className="details__contact">
              <div className="details__contact-name">
                <h4 className="details__title">Contact name:</h4>
                <p className="details__text">{this.state.warehouse.contact.name}</p>
                <p className="details__text">{this.state.warehouse.contact.position}</p>
              </div>
              <div className="details__contact-info">
                <h4 className="details__title">Contact information:</h4>
                <p className="details__text">{this.state.warehouse.contact.phone}</p>
                <p className="details__text">{this.state.warehouse.contact.email}</p>
              </div>
            </div>
          </div>
  
          <div className="column-labels">
            <div className="column-labels__left">
              <div className="column-labels__column column-labels__item">
                <h4 className="column-labels__text">Inventory item</h4>
                <img className="column-labels__sort-icon" src={sortIcon} alt="sort-by icon"/>
              </div>
              <div className="column-labels__column column-labels__category">
                <h4 className="column-labels__text">Category</h4>
                <img className="column-labels__sort-icon" src={sortIcon} alt="sort-by icon"/>
              </div>
              <div className="column-labels__column column-labels__status">
                <h4 className="column-labels__text">Status</h4>
                <img className="column-labels__sort-icon" src={sortIcon} alt="sort-by icon"/>
              </div>
            </div>
            <div className="column-labels__right">
              <div className="column-labels__column column-labels__quantity">
                <h4 className="column-labels__text">Quantity</h4>
                <img className="column-labels__sort-icon" src={sortIcon} alt="sort-by icon"/>
              </div>
              <div className="column-labels__column">
                <h4 className="column-labels__text">Actions</h4>
              </div>
            </div>
          </div>
          <ul className="inventory-list">
              {
                this.state.warehouseInventory.map((item) => {
                  return (
                    <WarehouseInvElement
                      itemName={item.itemName}
                      category={item.category}
                      status={item.status}
                      quantity={item.quantity}
                      id={item.id}
                      key={item.id}
                      showDeleteModal={this.showDeleteModal}
                    />
                )})
              }
          </ul>
          <DeleteInventory
            show={this.state.show}
            hideDeleteModal={this.hideDeleteModal}
            deleteInventory={this.deleteInventory}
            inventoryName={this.state.toDelete.name}
          />
          </>
        ) : (
          <h2 className="loading-message">Loading Data</h2>
        )}
      </>
    )
  }
}

export default WarehouseDetails;