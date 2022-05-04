import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
import backIcon from "../../assets/icons/arrow_back-24px.svg";
import EditButton from "../EditButton/EditButton";
import "./InventoryDetails.scss";

class InventoryDetails extends Component {
  state = {
    inventory: [],
  };

  componentDidMount = () => {
    this.getInventoryById();
  };

  //Function to get a single inventory from the API
  getInventoryById = () => {
    let currentID = this.props.match.params.id;
    axios
      .get(`${process.env.REACT_APP_API_URL}/inventory/${currentID}`)
      .then((response) => {
        this.setState({
          inventory: response.data,
        });
      })
      .catch((result) => {
        console.log(result);
      });
  };

  render = () => {
    return (
      <>
        {this.state.inventory.id ? (
          <>
            <div className="details-subheader">
              <div className="details-subheader__block">
                <Link className="details-subheader__back-link" to="/inventory">
                  <img
                    className="details-subheader__back-link-icon"
                    src={backIcon}
                    alt="Back arrow"
                  />
                </Link>
                <h1 className="details-subheader__title">
                  {this.state.inventory.itemName}
                </h1>
              </div>
              <EditButton
                route={`/inventory/edit/${this.state.inventory.id}`}
              />
            </div>
            <div className="inventory-details ">
              <div className="inventory-details__content border">
                <div className="inventory-details__description">
                  <h4 className="inventory-details__title">
                    item description:
                  </h4>
                  <p className="inventory-details__text">
                    {this.state.inventory.description}
                  </p>
                </div>
                <div className="inventory-details__category">
                  <h4 className="inventory-details__title">category:</h4>
                  <p className="inventory-details__text">
                    {this.state.inventory.category}
                  </p>
                </div>
              </div>
              <div className="inventory-details__content space ">
                <div className="inventory-details__wrapper">
                  <div className="inventory-details__state">
                    <h4 className="inventory-details__title">status</h4>
                    <div
                      className={`inventory-details__tag ${
                        this.state.inventory.status === "In Stock"
                          ? "inventory-details__green"
                          : "inventory-details__red"
                      }`}
                    >
                      <p className="inventory-details__status">
                        {this.state.inventory.status}
                      </p>
                    </div>
                  </div>
                  <div className="inventory-details__qtd">
                    <h4 className="inventory-details__title">quantity:</h4>
                    <p className="inventory-details__text">
                      {this.state.inventory.quantity}
                    </p>
                  </div>
                </div>
                <div className="inventory-details__warehouse">
                  <h4 className="inventory-details__title">warehouse:</h4>
                  <p className="inventory-details__text">
                    {this.state.inventory.warehouseName}
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <h2 className="loading-message">Loading Data</h2>
        )}
      </>
    );
  };
}
export default InventoryDetails;
