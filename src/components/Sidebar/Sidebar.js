import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ImStarFull } from "react-icons/im";
import { ImStarEmpty } from "react-icons/im";
import filter from "./filter.svg";
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";

import "./Sidebar.css";

export const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [productsFilteredByPrice, setProductsFilteredByPrice] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [lowPrice, setLowPrice] = useState();
  const [highPrice, setHighPrice] = useState();
  const [brandView, setBrandView] = useState(false);
  const [priceView, setPriceView] = useState(false);
  const [reviewView, setReviewView] = useState(false);

  const dispatch = useDispatch();

  const untouchedFiltered = useSelector(
    (state) => state.productReducer.untouchedFiltered
  );

  const productsFilteredByBrand = useSelector(
    (state) => state.productReducer.filteredByBrand
  );

  const allBrands = useSelector((state) => state.productReducer.brands);

  const showSideBar = () => {
    setSidebar(!sidebar);
  };

  const showBrandView = () => {
    setBrandView(!brandView);
  };

  const showPriceView = () => {
    setPriceView(!priceView);
  };

  const showReviewView = () => {
    setReviewView(!reviewView);
  };

  const filteredByBrand = (event, brand) => {
    const element = document.getElementById(event.target.id);

    //sets local state to empty, because user might input a price before a brand
    let products;
    if (productsFilteredByPrice.length >= 1) {
      products = productsFilteredByPrice;
    } else {
      products = untouchedFiltered;
    }

    // if element was checked
    if (element.checked) {
      //filters products if categorys match
      const productsToAdd = products.filter(
        (product) => product.brand === brand
      );
      // setting filtered products to local state and redux state
      const updatedProducts = [...filteredProducts, ...productsToAdd];
      dispatch({
        type: "PRODUCTS_FILTERED",
        payload: updatedProducts,
      });
      dispatch({
        type: "PRODUCTS_FILTERED_BY_BRAND",
        payload: updatedProducts,
      });
      setFilteredProducts(updatedProducts);
      // if element was unchecked
    } else {
      // removes products from list and updates local state and redux state
      let products;
      if (productsFilteredByPrice.length >= 1) {
        products = productsFilteredByPrice;
      } else {
        products = filteredProducts;
      }

      let removedCheckedProducts = products.filter((product) => {
        return product.brand !== brand;
      });
      if (removedCheckedProducts.length >= 1) {
        dispatch({
          type: "PRODUCTS_FILTERED",
          payload: removedCheckedProducts,
        });
        dispatch({
          type: "PRODUCTS_FILTERED_BY_BRAND",
          payload: removedCheckedProducts,
        });
        setFilteredProducts(removedCheckedProducts);
      } else {
        dispatch({
          type: "PRODUCTS_FILTERED_BY_BRAND",
          payload: [],
        });
        if (productsFilteredByPrice.length >= 1) {
          const filteredPrice = [];
          untouchedFiltered.map((product) => {
            if (product.price >= lowPrice && product.price <= highPrice) {
              filteredPrice.push(product);
            }
            return product;
          });
          dispatch({
            type: "PRODUCTS_FILTERED",
            payload: filteredPrice,
          });
          setFilteredProducts([]);
        } else {
          dispatch({
            type: "PRODUCTS_FILTERED",
            payload: untouchedFiltered,
          });
          setFilteredProducts([]);
        }
      }
    }
  };

  const filteredByPrice = (event, priceLow, priceHigh) => {
    const element = document.getElementById(event.target.id);
    setLowPrice(priceLow);
    setHighPrice(priceHigh);

    if (element.checked) {
      let products;
      if (productsFilteredByBrand.length >= 1) {
        products = productsFilteredByBrand;
      } else {
        products = untouchedFiltered;
      }
      console.log(products);
      const filteredPrice = [];
      products.map((product) => {
        if (product.price >= priceLow && product.price <= priceHigh) {
          filteredPrice.push(product);
        }
        return product;
      });
      setProductsFilteredByPrice(filteredPrice);
      dispatch({
        type: "PRODUCTS_FILTERED",
        payload: filteredPrice,
      });
    } else {
      const productsByCurrentBrands = [];
      const allProductsByCurrentBrands = [];
      productsFilteredByBrand.map((product) => {
        if (!productsByCurrentBrands.includes(product.brand)) {
          productsByCurrentBrands.push(product.brand);
        }
        return productsByCurrentBrands;
      });
      untouchedFiltered.map((product) => {
        if (productsByCurrentBrands.includes(product.brand)) {
          allProductsByCurrentBrands.push(product);
        }
        return allProductsByCurrentBrands;
      });
      console.log(productsByCurrentBrands);
      console.log(allProductsByCurrentBrands);
      if (productsFilteredByBrand.length >= 1) {
        console.log("yes");
        dispatch({
          type: "PRODUCTS_FILTERED",
          payload: allProductsByCurrentBrands,
        });
      } else {
        console.log("ehre");
        dispatch({
          type: "PRODUCTS_FILTERED",
          payload: untouchedFiltered,
        });
      }
      setProductsFilteredByPrice([]);
    }
  };

  return (
    <>
      <div>
        <div className="filter-bar">
          <div className="menu-bars" onClick={showSideBar}>
            <img className="filter-img" src={filter} alt="filter" />
            <p className="desktop-filter">Filter</p>
          </div>
        </div>
        <div
          className={sidebar ? "sidebar-nav-menu active" : "sidebar-nav-menu"}
        >
          <div className="form-check">
            <div className="brand">
              <p className="brand-title">Brand</p>
              <ul className="brand-list">
                {allBrands.map((brand) => {
                  return (
                    <li className="brand-list-item" key={brand}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id={brand}
                        onClick={(e) =>
                          filteredByBrand(e, brand, untouchedFiltered)
                        }
                      />
                      <label className="form-check-label" htmlFor={brand}>
                        {brand}
                      </label>
                    </li>
                  );
                })}
              </ul>
              <div className="price">
                <p className="price-title">Price</p>
                <ul className="price-list">
                  <li className="price-list-item">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="under25"
                      onClick={(e) => filteredByPrice(e, 0, 24.99)}
                    />
                    <label className="form-check-label" htmlFor="under25">
                      Under $25
                    </label>
                  </li>
                  <li className="price-list-item">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="25to50"
                      onClick={(e) => filteredByPrice(e, 25, 50)}
                    />
                    <label className="form-check-label" htmlFor="25to50">
                      $25 to $50
                    </label>
                  </li>
                  <li className="price-list-item">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="50to100"
                      onClick={(e) => filteredByPrice(e, 50.01, 100)}
                    />
                    <label className="form-check-label" htmlFor="50to100">
                      $50 to $100
                    </label>
                  </li>
                  <li className="price-list-item">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="100to200"
                      onClick={(e) => filteredByPrice(e, 100.01, 200)}
                    />
                    <label className="form-check-label" htmlFor="100to200">
                      $100 to $200
                    </label>
                  </li>
                  <li className="price-list-item">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="200plus"
                      onClick={(e) => filteredByPrice(e, 200.01, 100000000)}
                    />
                    <label className="form-check-label" htmlFor="200plus">
                      $200 and Above
                    </label>
                  </li>
                </ul>
              </div>
              <div className="reviews">
                <p className="reviews-title">Reviews</p>
                <ul className="reviews-list">
                  <li className="review-item">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="1star"
                    />
                    <label className="form-check-label" htmlFor="1star">
                      {<ImStarFull className="star" />}
                      {<ImStarFull className="star" />}
                      {<ImStarFull className="star" />}
                      {<ImStarFull className="star" />}
                      {<ImStarFull className="star" />}
                    </label>
                  </li>
                  <li className="review-item">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="2star"
                    />
                    <label className="form-check-label" htmlFor="2star">
                      {<ImStarFull className="star" />}
                      {<ImStarFull className="star" />}
                      {<ImStarFull className="star" />}
                      {<ImStarFull className="star" />}
                      {<ImStarEmpty className="star" />}
                    </label>
                  </li>
                  <li className="review-item">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="3star"
                    />
                    <label className="form-check-label" htmlFor="3star">
                      {<ImStarFull className="star" />}
                      {<ImStarFull className="star" />}
                      {<ImStarFull className="star" />}
                      {<ImStarEmpty className="star" />}
                      {<ImStarEmpty className="star" />}
                    </label>
                  </li>
                  <li className="review-item">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="4star"
                    />
                    <label className="form-check-label" htmlFor="4star">
                      {<ImStarFull className="star" />}
                      {<ImStarFull className="star" />}
                      {<ImStarEmpty className="star" />}
                      {<ImStarEmpty className="star" />}
                      {<ImStarEmpty className="star" />}
                    </label>
                  </li>
                  <li className="review-item">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="5star"
                    />
                    <label className="form-check-label" htmlFor="5star">
                      {<ImStarFull className="star" />}
                      {<ImStarEmpty className="star" />}
                      {<ImStarEmpty className="star" />}
                      {<ImStarEmpty className="star" />}
                      {<ImStarEmpty className="star" />}
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="top-bar-filter sticky-top"
        data-toggle="modal"
        data-target="#filterModal"
      >
        <img src={filter} alt="filter" className="mobile-filter-icon" />
        <button className="filter-button">Filter</button>
      </div>
      <div>
        <div className="modal fade" id="filterModal">
          <div className="modal-dialog mobile-modal-dialog modal-md">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title">Filter + Sort</h1>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body mobile-modal-body">
                <div
                  className="brand-title-container d-flex justify-content-between"
                  onClick={() => showBrandView()}
                >
                  <button className="btn btn-default mobile-brand-title">
                    BRANDS
                  </button>
                  {brandView ? (
                    <AiOutlineMinus className="view-symbol" />
                  ) : (
                    <AiOutlinePlus className="view-symbol" />
                  )}
                </div>
                {brandView ? (
                  <>
                    <div className="mobile-brands">
                      <ul className="mobile-brands-list">
                        {allBrands.map((brand) => {
                          return (
                            <li className="mobile-brands-list-item" key={brand}>
                              <input
                                className="mobile-brand-input"
                                type="checkbox"
                                value=""
                                id={brand}
                                onClick={(e) =>
                                  filteredByBrand(e, brand, untouchedFiltered)
                                }
                              />
                              <label
                                className="mobile-brand-label"
                                htmlFor={brand}
                              >
                                {brand}
                              </label>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </>
                ) : (
                  ""
                )}
                <hr className="line-break" />
                <div
                  className="price-title-container d-flex justify-content-between"
                  onClick={() => showPriceView()}
                >
                  <button
                    className="btn btn-default mobile-price-title"
                    type="button"
                  >
                    PRICE
                  </button>
                  {priceView ? (
                    <AiOutlineMinus className="view-symbol" />
                  ) : (
                    <AiOutlinePlus className="view-symbol" />
                  )}
                </div>
                {priceView ? (
                  <div className="mobile-price-container">
                    <ul
                      className="mobile-price-list"
                      role="menu"
                      aria-labelledby=""
                    >
                      <li className="mobile-price-list-item">
                        <input
                          className="mobile-price-input"
                          type="checkbox"
                          id="under25"
                          onClick={(e) => filteredByPrice(e, 0, 24.99)}
                        />
                        <label className="mobile-price-label" htmlFor="under25">
                          Under $25
                        </label>
                      </li>
                      <li className="mobile-price-list-item">
                        <input
                          className="mobile-price-input"
                          type="checkbox"
                          id="25to50"
                          onClick={(e) => filteredByPrice(e, 25, 50)}
                        />
                        <label className="mobile-price-label" htmlFor="25to50">
                          $25 to $50
                        </label>
                      </li>
                      <li className="mobile-price-list-item">
                        <input
                          className="mobile-price-input"
                          type="checkbox"
                          id="50to100"
                          onClick={(e) => filteredByPrice(e, 50.01, 100)}
                        />
                        <label className="mobile-price-label" htmlFor="50to100">
                          $50 to $100
                        </label>
                      </li>
                      <li className="mobile-price-list-item">
                        <input
                          className="mobile-price-input"
                          type="checkbox"
                          id="100to200"
                          onClick={(e) => filteredByPrice(e, 100.01, 200)}
                        />
                        <label
                          className="mobile-price-label"
                          htmlFor="100to200"
                        >
                          $100 to $200
                        </label>
                      </li>
                      <li className="mobile-price-list-item">
                        <input
                          className="mobile-price-input"
                          type="checkbox"
                          id="200plus"
                          onClick={(e) => filteredByPrice(e, 200.01, 100000000)}
                        />
                        <label className="mobile-price-label" htmlFor="200plus">
                          $200 and Above
                        </label>
                      </li>
                    </ul>
                  </div>
                ) : (
                  ""
                )}
                <hr className="line-break" />
                <div
                  className="review-title-container d-flex justify-content-between"
                  onClick={() => showReviewView()}
                >
                  <button
                    className="btn btn-default mobile-review-title"
                    type="button"
                  >
                    REVIEWS
                  </button>
                  {reviewView ? (
                    <AiOutlineMinus className="view-symbol" />
                  ) : (
                    <AiOutlinePlus className="view-symbol" />
                  )}
                </div>
                {reviewView ? (
                  <div className="mobile-review-container">
                    <ul className="mobile-review-list">
                      <li className="mobile-review-list-item">
                        <input
                          className="mobile-review-input"
                          type="checkbox"
                          id="1star"
                        />
                        <label className="mobile-review-label" htmlFor="1star">
                          {<ImStarFull className="star" />}
                          {<ImStarFull className="star" />}
                          {<ImStarFull className="star" />}
                          {<ImStarFull className="star" />}
                          {<ImStarFull className="star" />}
                        </label>
                      </li>
                      <li className="mobile-review-list-item">
                        <input
                          className="mobile-review-input"
                          type="checkbox"
                          id="2star"
                        />
                        <label className="mobile-review-label" htmlFor="2star">
                          {<ImStarFull className="star" />}
                          {<ImStarFull className="star" />}
                          {<ImStarFull className="star" />}
                          {<ImStarFull className="star" />}
                          {<ImStarEmpty className="star" />}
                        </label>
                      </li>
                      <li className="mobile-review-list-item">
                        <input
                          className="mobile-review-input"
                          type="checkbox"
                          id="3star"
                        />
                        <label className="mobile-review-label" htmlFor="3star">
                          {<ImStarFull className="star" />}
                          {<ImStarFull className="star" />}
                          {<ImStarFull className="star" />}
                          {<ImStarEmpty className="star" />}
                          {<ImStarEmpty className="star" />}
                        </label>
                      </li>
                      <li className="mobile-review-list-item">
                        <input
                          className="mobile-review-input"
                          type="checkbox"
                          id="4star"
                        />
                        <label className="mobile-review-label" htmlFor="4star">
                          {<ImStarFull className="star" />}
                          {<ImStarFull className="star" />}
                          {<ImStarEmpty className="star" />}
                          {<ImStarEmpty className="star" />}
                          {<ImStarEmpty className="star" />}
                        </label>
                      </li>
                      <li className="mobile-review-list-item">
                        <input
                          className="mobile-review-input"
                          type="checkbox"
                          id="5star"
                        />
                        <label className="mobile-review-label" htmlFor="5star">
                          {<ImStarFull className="star" />}
                          {<ImStarEmpty className="star" />}
                          {<ImStarEmpty className="star" />}
                          {<ImStarEmpty className="star" />}
                          {<ImStarEmpty className="star" />}
                        </label>
                      </li>
                    </ul>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="modal-footer mobile-modal-footer">
                <button className="clear-all-filters">CLEAR ALL FILTERS</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
