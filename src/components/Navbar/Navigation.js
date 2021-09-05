import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import shoppingcart from "./shopping-cart.svg";
import pin from "./pin.svg";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { IoCartOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { BsChevronDown } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

export const Navigation = () => {
  const name = localStorage.getItem("firstName");
  const productsList = useSelector((state) => state.productReducer.data);
  const [searchActive, setSearchActive] = useState();
  const [searchInput, setSearchInput] = useState("");

  const dispatch = useDispatch();

  //get all brands of the passed in product array and sets them redux state
  const getBrands = (productsOfTheBrands) => {
    const allBrands = [];
    productsOfTheBrands.map((product) => {
      return allBrands.push(product.brand);
    });
    const filteredBrands = [];
    allBrands.map((brand) => {
      if (filteredBrands.includes(brand)) {
      } else {
        filteredBrands.push(brand);
      }
      return filteredBrands;
    });
    dispatch({
      type: "PRODUCTS_BRANDS",
      payload: filteredBrands,
    });
  };

  const filterByInput = (gender, typeOfInput, view) => {
    dispatch({
      type: "PRODUCTS_FILTERED_REQUESTED",
    });
    const filteredProducts = [];
    const byGenderProducts = [];

    //filters product by gender
    productsList.map((product) => {
      const correctGender = product.gender === gender;
      if (correctGender) {
        byGenderProducts.push(product);
      }
      return byGenderProducts;
    });

    // if input it 'all' , all gendered products are sent to state
    if (typeOfInput === "all") {
      try {
        dispatch({
          type: "SET_CURRENT_VIEW",
          payload: view,
        });
        dispatch({
          type: "PRODUCTS_FILTERED",
          payload: byGenderProducts,
        });
        dispatch({
          type: "PRODUCTS_FILTERED_UNTOUCHED",
          payload: byGenderProducts,
        });
        getBrands(byGenderProducts);
      } catch (error) {
        console.error(error);
      }

      //filters gendered products by new arrivals
    } else if (typeOfInput === "newArrival") {
      byGenderProducts.map((product) => {
        const correctType = product.newArrival === true;
        if (correctType) {
          filteredProducts.push(product);
        }
        return filteredProducts;
      });

      try {
        dispatch({
          type: "SET_CURRENT_VIEW",
          payload: view,
        });
        dispatch({
          type: "PRODUCTS_FILTERED",
          payload: filteredProducts,
        });
        dispatch({
          type: "PRODUCTS_FILTERED_UNTOUCHED",
          payload: filteredProducts,
        });
        getBrands(filteredProducts);
      } catch (error) {
        console.error(error);
      }
    } else {
      //fitlers the gendered products by the type
      byGenderProducts.map((product) => {
        const correctType = product.type === typeOfInput;
        if (correctType) {
          filteredProducts.push(product);
        }
        return filteredProducts;
      });
      try {
        dispatch({
          type: "SET_CURRENT_VIEW",
          payload: view,
        });
        dispatch({
          type: "PRODUCTS_FILTERED",
          payload: filteredProducts,
        });
        dispatch({
          type: "PRODUCTS_FILTERED_UNTOUCHED",
          payload: filteredProducts,
        });
        getBrands(filteredProducts);
      } catch (error) {
        console.error(error);
      }
    }
  };

  //for seach bar but currently not working
  const submitSearchInput = (input) => {
    const filteredProductsList = productsList.filter((product) => {
      return product.title.toLowerCase().includes(input.toLowerCase());
    });
    dispatch({
      type: "PRODUCTS_FILTERED",
      payload: filteredProductsList,
    });
    dispatch({
      type: "PRODUCTS_FILTERED_UNTOUCHED",
      payload: filteredProductsList,
    });
    getBrands(filteredProductsList);
  };

  //male and female new arrivals
  const viewNewArrivals = () => {
    const allNewArrivals = [];
    productsList.map((product) => {
      if (product.newArrival) {
        allNewArrivals.push(product);
      }
      return allNewArrivals;
    });

    try {
      dispatch({
        type: "SET_CURRENT_VIEW",
        payload: "New Arrivals",
      });
      dispatch({
        type: "PRODUCTS_FILTERED",
        payload: allNewArrivals,
      });
      dispatch({
        type: "PRODUCTS_FILTERED_UNTOUCHED",
        payload: allNewArrivals,
      });
      getBrands(allNewArrivals);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div
        className={
          searchActive
            ? "search-container active fixed-top"
            : "search-container"
        }
      >
        <div className="search-input-close-container">
          <AiOutlineClose
            className="search-input-close"
            onClick={() => setSearchActive(!searchActive)}
          />
        </div>
        <div className="search-input-container">
          <form className="search-input-form">
            <div className="search-input-form-container">
              <BsSearch
                className="search-input-icon"
                onClick={() => {
                  submitSearchInput(searchInput);
                  setSearchActive(!searchActive);
                }}
              />
              <input
                type="search"
                className="form-control search-input"
                placeholder="What are you looking for?"
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="free-shipping-container fixed-top">
        <p className="free-shipping">FREE SHIPPING FOR ALL U.S ORDERS</p>
      </div>
      <nav className="navbar fixed-top navbar-expand-md navbar-light bg-light">
        <Link className="navbar-brand" to="/home">
          Timazon <img src={shoppingcart} alt="shopping cart" />{" "}
        </Link>
        <a className="navbar-brand deliver-to" href="#home">
          <img alt="map-marker" src={pin} />
          Deliver to {name}
        </a>
        <div className="navbar-items-container ml-auto">
          <ul className="navbar-nav-list">
            <li className="nav-list-item">
              <a className="nav-item-link" href="#home">
                <BsSearch
                  className="search-icon"
                  onClick={() => setSearchActive(!searchActive)}
                />
              </a>
            </li>
            <li className="nav-list-item">
              <Link to="/profile" className="nav-item-link">
                <CgProfile className="profile-icon" />
              </Link>
            </li>
            <li className="nav-list-item">
              <a className="nav-item-link" href="#home">
                <IoCartOutline className="cart-icon" />
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="category-bar">
        <ul className="intro-list">
          <li className="intro-list-item">
            <Link to="/products">
              <button
                className="category-item btn shadow-none"
                onClick={() => viewNewArrivals()}
              >
                NEW ARRIVALS
              </button>
            </Link>
          </li>
          <li className="intro-list-item">
            <Link to="/products">
              <button className="category-item btn shadow-none">ON SALE</button>
            </Link>
          </li>
          <li className="intro-list-item">
            <div className="dropdown men-dropdown">
              <p
                className="btn category-item men-button shadow-none"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                data-hover="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                MEN <BsChevronDown className="category-dropdown-icon" />
              </p>

              <div
                className="dropdown-menu men-dropdown-menu "
                aria-labelledby="dropdownMenuLink"
              >
                <ul className="dropdown-list nav-dropdown-list">
                  <li className="dropdown-item nav-dropdown-item">
                    <NavLink to="/products">
                      <button
                        className="nav-dropdown-button shadow-none "
                        onClick={() => filterByInput("male", "all", "Men's")}
                      >
                        All
                      </button>
                    </NavLink>
                  </li>
                  <li className="dropdown-item nav-dropdown-item">
                    <NavLink to="/products">
                      <button
                        className="nav-dropdown-button"
                        onClick={() =>
                          filterByInput("male", "shirt", "Men's Shirts")
                        }
                      >
                        Shirts
                      </button>
                    </NavLink>
                  </li>
                  <li className="dropdown-item nav-dropdown-item">
                    <NavLink to="/products">
                      <button
                        className="nav-dropdown-button"
                        onClick={() =>
                          filterByInput("male", "sweater", "Men's Sweaters")
                        }
                      >
                        Sweaters
                      </button>
                    </NavLink>
                  </li>
                  <li className="dropdown-item nav-dropdown-item">
                    <NavLink to="/products">
                      <button
                        className="nav-dropdown-button"
                        onClick={() =>
                          filterByInput("male", "pants", "Men's Pants")
                        }
                      >
                        Pants
                      </button>
                    </NavLink>
                  </li>
                  <li className="dropdown-item nav-dropdown-item">
                    <NavLink to="/products">
                      <button
                        className="nav-dropdown-button"
                        onClick={() =>
                          filterByInput("male", "shoes", "Men's Shoes")
                        }
                      >
                        Shoes
                      </button>
                    </NavLink>
                  </li>
                  <li className="dropdown-item nav-dropdown-item">
                    <NavLink to="/products">
                      <button
                        className="nav-dropdown-button"
                        onClick={() =>
                          filterByInput(
                            "male",
                            "accessories",
                            "Men's Accessories"
                          )
                        }
                      >
                        Accessories
                      </button>
                    </NavLink>
                  </li>
                  <li className="dropdown-item nav-dropdown-item">
                    <NavLink to="/products">
                      <button
                        className="nav-dropdown-button"
                        onClick={() =>
                          filterByInput(
                            "male",
                            "newArrival",
                            "Men's New Arrivals"
                          )
                        }
                      >
                        New arrivals
                      </button>
                    </NavLink>
                  </li>
                  <li className="dropdown-item nav-dropdown-item">
                    <button className="nav-dropdown-button">On sale</button>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li className="intro-list-item">
            <div className="dropdown women-dropdown">
              <p
                className="btn  category-item women-button shadow-none"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                data-hover="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                WOMEN <BsChevronDown className="category-dropdown-icon" />
              </p>

              <div
                className="dropdown-menu women-dropdown-menu "
                aria-labelledby="dropdownMenuLink"
              >
                <ul className="dropdown-list nav-dropdown-list">
                  <li className="dropdown-item nav-dropdown-item">
                    <NavLink to="/products">
                      <button
                        className="nav-dropdown-button shadow-none "
                        onClick={() =>
                          filterByInput("female", "all", "Women's")
                        }
                      >
                        All
                      </button>
                    </NavLink>
                  </li>
                  <li className="dropdown-item nav-dropdown-item">
                    <NavLink to="/products">
                      <button
                        className="nav-dropdown-button"
                        onClick={() =>
                          filterByInput("female", "shirt", "Women's Shirts")
                        }
                      >
                        Shirts
                      </button>
                    </NavLink>
                  </li>
                  <li className="dropdown-item nav-dropdown-item">
                    <NavLink to="/products">
                      <button
                        className="nav-dropdown-button"
                        onClick={() =>
                          filterByInput("female", "sweater", "Women's Sweaters")
                        }
                      >
                        Sweaters
                      </button>
                    </NavLink>
                  </li>
                  <li className="dropdown-item nav-dropdown-item">
                    <NavLink to="/products">
                      <button
                        className="nav-dropdown-button"
                        onClick={() =>
                          filterByInput("female", "pants", "Women's Pants")
                        }
                      >
                        Pants
                      </button>
                    </NavLink>
                  </li>
                  <li className="dropdown-item nav-dropdown-item">
                    <NavLink to="/products">
                      <button
                        className="nav-dropdown-button"
                        onClick={() =>
                          filterByInput("female", "shoes", "Women's Shoes")
                        }
                      >
                        Shoes
                      </button>
                    </NavLink>
                  </li>
                  <li className="dropdown-item nav-dropdown-item">
                    <NavLink to="/products">
                      <button
                        className="nav-dropdown-button"
                        onClick={() =>
                          filterByInput(
                            "female",
                            "accessories",
                            "Women's Accessories"
                          )
                        }
                      >
                        Accessories
                      </button>
                    </NavLink>
                  </li>
                  <li className="dropdown-item nav-dropdown-item">
                    <NavLink to="/products">
                      <button
                        className="nav-dropdown-button"
                        onClick={() =>
                          filterByInput(
                            "female",
                            "newArrival",
                            "Women's New Arrivals"
                          )
                        }
                      >
                        New arrivals
                      </button>
                    </NavLink>
                  </li>
                  <li className="dropdown-item nav-dropdown-item">
                    <NavLink to="/products">
                      <button className="nav-dropdown-button">On sale</button>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};
