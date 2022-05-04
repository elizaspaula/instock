import "./EditWarehouse.scss";
import React from "react";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import { Link } from "react-router-dom";
import error from "../../assets/icons/error-24px.svg";
import axios from "axios";
// CHANGE OUT ALL THE EDIT INVENTORY STUFF FOR WAREHOUSE SPECIFIC DETAILS
//ALL CODE BELOW IS JUST FOR SHOW/PLACEHOLDER

class EditWarehouse extends React.Component {
  state = {
    id: "",
    whname: "",
    address: "",
    city: "",
    country: "",
    name: "",
    position: "",
    phone: "",
    email: "",
    whnamevalid: true,
    addressvalid: true,
    cityvalid: true,
    countryvalid: true,
    namevalid: true,
    positionvalid: true,
    phonevalid: true,
    emailvalid: true,
    formvalid: true,
  };

  // function gets id of the warehouse and send a get axios request
  getWarehouseById = () => {
    let currentID = this.props.match.params.id;
    axios
      .get(`${process.env.REACT_APP_API_URL}/warehouses/${currentID}`)
      .then((res) => {
        // if the axios request is successful the component is updated and data is updated in fields accordingly
        this.setState({
          id: res.data.id,
          whname: res.data.name,
          address: res.data.address,
          city: res.data.city,
          country: res.data.country,
          name: res.data.contact.name,
          position: res.data.contact.position,
          phone: res.data.contact.phone,
          email: res.data.contact.email,
        });
      })
      .catch((result) => {
        console.log(result);
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let currentID = this.props.match.params.id;
    if (this.state.formvalid) {
      const updatedData = {
        whname: this.state.whname,
        address: this.state.address,
        city: this.state.city,
        country: this.state.country,
        name: this.state.name,
        position: this.state.position,
        phone: this.state.phone,
        email: this.state.email,
      };
      
      const updateWarehouse = axios.put(
        `${process.env.REACT_APP_API_URL}/warehouses/${currentID}`,
        updatedData
      );
      updateWarehouse
        .then((res) => {
          window.alert(res.data);
          this.props.history.push(`/warehouses/${currentID}`);
        })
        .catch((error) => {
          window.alert(error);
        });
    }
  };

  //any input change is updated and field validation is called to check if input is in acceptable format
  handleChange = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => {
        this.validateField(event.target, event.target.value);
      }
    );
  };
  //takes in field and its value to check if value is in acceptable format according to the field
  validateField(field, value) {
    let whnamevalidation = this.state.whnamevalid;
    let addressvalidation = this.state.addressvalid;
    let cityvalidation = this.state.cityvalid;
    let countryvalidation = this.state.countryvalid;
    let namevalidation = this.state.namevalid;
    let positionvalidation = this.state.positionvalid;
    let phonevalidation = this.state.phonevalid;
    let emailvalidation = this.state.emailvalid;
    const re = /^[a-zA-Z]/;
    const emailRe = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const addRe = /[A-za-z0–9_]/;
    const phoneRe = /^[0-9]{11}$/;
    switch (field.name) {
      case "whname":
        whnamevalidation = re.test(value);
        this.showInputError(field, whnamevalidation);
        break;
      case "address":
        addressvalidation = addRe.test(value);
        this.showInputError(field, addressvalidation);
        break;
      case "city":
        cityvalidation = re.test(value);
        this.showInputError(field, cityvalidation);
        break;
      case "country":
        countryvalidation = re.test(value);
        this.showInputError(field, countryvalidation);
        break;
      case "name":
        namevalidation = re.test(value);
        this.showInputError(field, namevalidation);
        break;
      case "position":
        positionvalidation = re.test(value);
        this.showInputError(field, positionvalidation);
        break;
      case "phone":
        const phonetrim = value.replace(/\D/g, "");
        phonevalidation = phoneRe.test(phonetrim);
        this.showInputError(field, phonevalidation);

        break;
      case "email":
        emailvalidation = emailRe.test(value);
        this.showInputError(field, emailvalidation);
        break;
      default:
        break;
    }
    //once the field input is validated the status is updated in state and function is called to validate form accordingly
    this.setState({
      whnamevalid: whnamevalidation,
      addressvalid: addressvalidation,
      cityvalid: cityvalidation,
      countryvalid: countryvalidation,
      namevalid: namevalidation,
      positionvalid: positionvalidation,
      phonevalid: phonevalidation,
      emailvalid: emailvalidation,
    }, this.validateForm);
  }
    //checks if the form is valid after every changed in the field and updates the status
    validateForm() {
      this.setState({
        formvalid: this.state.addressvalid &&
        this.state.whnamevalid &&
        this.state.cityvalid &&
        this.state.countryvalid &&
        this.state.namevalid &&
        this.state.positionvalid &&
        this.state.phonevalid &&
        this.state.emailvalid
      })
    }
  showInputError(field, status) {
    if (!status) {
      field.classList.add("details__input--error");
      field.nextSibling.style.display = "block";

    } else {
      field.classList.remove("details__input--error");
      field.nextSibling.style.display = "none";

    }
  }
  componentDidMount() {
    this.getWarehouseById();
  }

  render() {
    return (
      <div className="box-shadow">
        <div className="edit-inven__subheader">
          <Link to="/warehouses">
            <img src={backArrow} alt="back arrow" className="back-icon" />
          </Link>
          <h2 className="subheader__text">Edit Warehouse</h2>
        </div>
        <form
          className="edit-inven__details"
          id="warehouse-form"
          onSubmit={this.handleSubmit}
        >
          <div className="details__container">
            <h3 className="details__subheader">Warehouse Details</h3>
            <div className="details__form">
              <label htmlFor="whname" className="details__label">
                Warehouse Name
              </label>
              <input
                type="text"
                className="details__input"
                placeholder="Warehouse Name"
                id="whname"
                name="whname"
                value={this.state.whname}
                onChange={this.handleChange}
              />
              <p className="details__err">
                <img className="details__err--img" src={error} alt="error" />{" "}
                This field is required
              </p>
              <label htmlFor="address" className="details__label">
                Street Address
              </label>
              <input
                type="text"
                className="details__input"
                placeholder="Street Address"
                id="address"
                name="address"
                value={this.state.address}
                onChange={this.handleChange}
              />
              <p className="details__err">
                <img className="details__err--img" src={error} alt="error" />{" "}
                This field is required
              </p>
              <label htmlFor="city" className="details__label">
                City
              </label>
              <input
                type="text"
                className="details__input"
                placeholder="City"
                id="city"
                name="city"
                value={this.state.city}
                onChange={this.handleChange}
              />
              <p className="details__err">
                <img className="details__err--img" src={error} alt="error" />{" "}
                This field is required
              </p>
              <label htmlFor="country" className="details__label">
                Country
              </label>
              <input
                type="text"
                className="details__input"
                placeholder="Country"
                id="country"
                name="country"
                value={this.state.country}
                onChange={this.handleChange}
              />
              <p className="details__err">
                <img className="details__err--img" src={error} alt="error" />{" "}
                This field is required
              </p>
            </div>
          </div>
          <div className="details__container">
            <h3 className="details__subheader">Contact Details</h3>
            <div className="details__form">
              <label htmlFor="name" className="details__label">
                Contact Name
              </label>
              <input
                type="text"
                className="details__input"
                placeholder="Name"
                id="name"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
              <p className="details__err">
                <img className="details__err--img" src={error} alt="error" />{" "}
                This field is required
              </p>
              <label htmlFor="position" className="details__label">
                Position
              </label>
              <input
                type="text"
                className="details__input"
                placeholder="Position"
                id="position"
                name="position"
                value={this.state.position}
                onChange={this.handleChange}
              />
              <p className="details__err">
                <img className="details__err--img" src={error} alt="error" />{" "}
                This field is required
              </p>
              <label htmlFor="phone" className="details__label">
                Phone Number
              </label>
              <input
                type="text"
                className="details__input"
                placeholder="Phone Number"
                id="phone"
                name="phone"
                value={this.state.phone}
                onChange={this.handleChange}
              />
              <p className="details__err">
                <img className="details__err--img" src={error} alt="error" />{" "}
                This field is required
              </p>
              <label htmlFor="email" className="details__label">
                Email
              </label>
              <input
                type="text"
                className="details__input"
                placeholder="Email"
                id="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <p className="details__err">
                <img className="details__err--img" src={error} alt="error" />{" "}
                This field is required
              </p>
            </div>
          </div>
        </form>
        <div className="buttons">
          <Link to="/warehouses" className="cancel-btn">
            Cancel
          </Link>
          <button type="submit" form="warehouse-form" className="save-btn">
            Save
          </button>
        </div>
      </div>
    );
  }
}

export default EditWarehouse;
