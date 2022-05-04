import { Component } from "react";
import "./Inventory.scss";
import SearchHeader from "../../components/SearchHeader/SearchHeader";
import InventoryList from "../../components/InventoryList/InventoryList";
import axios from "axios";
import DeleteInventory from "../../components/DeleteInventory/DeleteInventory.jsx";

class Inventory extends Component {
  state = {
    inventories: [],
    show: false,
    toDelete: {},
  };

  showDeleteModal = (name, id) => {
    this.setState({ show: true, toDelete: { name: name, id: id } });
  };

  hideDeleteModal = () => {
    this.setState({ show: false, toDelete: {} });
  };

  componentDidMount() {
    this.getAllInventories();
  }

  //Function to get all inventories from the API
  getAllInventories = () => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}/inventory`)
      .then((response) => {
        this.setState({
          inventories: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Function to delete a single inventory
  deleteInventory = () => {
    let currentId = this.state.toDelete.id;
    return axios
      .delete(`${process.env.REACT_APP_API_URL}/inventory/${currentId}`)
      .then((response) => {
        this.setState({
          inventories: response.data,
          toDelete: {},
          show: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <>
        <SearchHeader
          title="Inventory"
          content="+ add new item"
          link="inventory"
        />
        <InventoryList
          inventories={this.state.inventories}
          showDeleteModal={this.showDeleteModal}
        />

        <DeleteInventory
          show={this.state.show}
          hideDeleteModal={this.hideDeleteModal}
          deleteInventory={this.deleteInventory}
          inventoryName={this.state.toDelete.name}
        />
      </>
    );
  }
}

export default Inventory;
