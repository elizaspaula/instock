import "./AddWarehouse.scss";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import { Link } from "react-router-dom";
import error from "../../assets/icons/error-24px.svg";
import axios from "axios";
import React from "react";

class AddWarehouse extends React.Component {
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
    whnamevalid: false,
    addressvalid: false,
    cityvalid: false,
    countryvalid: false,
    namevalid: false,
    positionvalid: false,
    phonevalid: false,
    emailvalid: false,
    formvalid: false,
  };

// this tracks each field and adds to the state. Once the state is changed it checks if the input is valid
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
  //takes in field that has been changed and its values and checks if the value is valid according to the required format. Then it changes the state of of field validity accordingly. Once the field valididy status is updated it calls to confirm if the form is valid.
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
    const emailRe = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const addRe = /[A-za-z0–9_]/;
    const phoneRe = /^[0-9]{10}$/;
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
  //checks if the fieldValid state is true
  isTrue(fieldValid){
    return fieldValid === true
  }
  //takes in field and validity of the field to render error
  showInputError(field, status) {
    if (!status) {
      field.classList.add("details__input--error");
      field.nextSibling.style.display = "block";

    } else {
      field.classList.remove("details__input--error");
      field.nextSibling.style.display = "none";
    }
  }
  //form submission event handler
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      submit:true
    })
    //if form is valid it will take form field information and send post axios request 
    if (this.state.formvalid) {
      const newWarehouse = {
        whname: this.state.whname,
        address: this.state.address,
        city: this.state.city,
        country: this.state.country,
        name: this.state.name,
        position: this.state.position,
        phone: this.state.phone,
        email: this.state.email,
      };
      const addWarehouse = axios.post(
        `${process.env.REACT_APP_API_URL}/warehouses`,
        newWarehouse
      );
      addWarehouse
        .then((res) => {
          window.alert(res.data);
          this.props.history.push("/warehouses")
        })
        .catch((err) => {
          window.alert(err);
        });
    //it will check every field and validate it
    } else {
      const inputlist = e.target.querySelectorAll("input")
      inputlist.forEach((field) => {
        this.validateField(field, field.value);
      })
    }
  };
  render() {
    return (
      <div className="box-shadow">
        <div className="edit-inven__subheader">
          <Link to="/warehouses">
            <img src={backArrow} alt="back arrow" className="back-icon" />
          </Link>
          <h2 className="subheader__text">Add New Warehouse</h2>
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
          <button
            type="submit"
            form="warehouse-form"
            className="save-btn"
            id ="add-warehouse"
          >
            +Add Warehouse
          </button>
        </div>
      </div>
    );
  }
}

export default AddWarehouse;
