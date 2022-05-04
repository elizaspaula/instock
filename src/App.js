import "./styles/App.scss";
import Inventory from "./pages/Inventory/Inventory";
import Warehouses from "./pages/Warehouses/Warehouses";
import EditInven from "./components/EditInven/EditInven";
import AddInven from "./components/AddInven/AddInven";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AddWarehouse from "./components/AddWarehouse/AddWarehouse.jsx";
import EditWarehouse from "./components/EditWarehouse/EditWarehouse.jsx";
import InventoryDetails from "./components/InventoryDetails/InventoryDetails";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import WarehouseDetails from "./components/WarehouseDetails/WarehouseDetails";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <article className="page-container">
          <div className="page-container__inner">
            <Switch>
              <Redirect path="/" to="/warehouses" exact />
              <Route path="/warehouses" exact component={Warehouses} />
              <Route path="/warehouses/edit/:id" exact component={EditWarehouse} />
              <Route path="/warehouses/add" exact component={AddWarehouse} />
              <Route path="/warehouses/:id" component={WarehouseDetails} />
              <Route path="/inventory" exact component={Inventory} />
              <Route path="/inventory/add" component={AddInven} />
              <Route path="/inventory/:id" exact component={InventoryDetails} />
              <Route path="/inventory/edit/:id" component={EditInven} />
            </Switch>
          </div>
          <Footer />
        </article>
      </div>
    </BrowserRouter>
  );
}

export default App;
