import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ImStarFull } from "react-icons/im";
import { ImStarEmpty } from "react-icons/im";
import { FaBars } from "react-icons/fa";

import "./Sidebar.css";

export const Sidebar = () => {
  const [categorys, setCategorys] = useState([]);
  const [sidebar, setSidebar] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const dispatch = useDispatch();

  const productCategories = useSelector(
    (state) => state.productReducer.categorys
  );

  const allProducts = useSelector((state) => state.productReducer.data);

  // returns all categorys
  const getCategorys = (allCategorys) => {
    const productCategories = [];
    allCategorys.map((category) => {
      if (productCategories.includes(category)) {
      } else {
        productCategories.push(category);
      }
      return setCategorys(productCategories);
    });
  };

  const showSideBar = () => {
    getCategorys(productCategories);
    setSidebar(!sidebar);
  };

  const filteredByCategory = (event, category, products) => {
    const element = document.getElementById(event.target.id);
    if (element.checked) {
      const productsToAdd = products.filter(
        (product) => product.category === category
      );
      setFilteredProducts((currentFilteredProducts) => [
        ...currentFilteredProducts,
        ...productsToAdd,
      ]);
      dispatch({
        type: "PRODUCTS_FILTERED",
        payload: filteredProducts,
      });
    } else {
      let removedCheckedProducts = filteredProducts.filter((product) => {
        return product.category !== category;
      });
      setFilteredProducts(removedCheckedProducts);
      if (removedCheckedProducts.length >= 1) {
        dispatch({
          type: "PRODUCTS_FILTERED",
          payload: removedCheckedProducts,
        });
      } else {
        dispatch({
          type: "PRODUCTS_FILTERED",
          payload: allProducts,
        });
      }
    }
  };

  return (
    <div>
      <div className="nav-bar">
        <Link to="#" className="menu-bars">
          <FaBars className="bars" onClick={showSideBar} />
        </Link>
      </div>
      <div className={sidebar ? "sidebar-nav-menu active" : "sidebar-nav-menu"}>
        <div className="form-check">
          <div className="category">
            <p className="category-title">Category</p>
            <ul className="category-list">
              {categorys.map((category) => {
                return (
                  <li className="category-list-item" key={category}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id={category}
                      onClick={(e) =>
                        filteredByCategory(e, category, allProducts)
                      }
                    />
                    <label className="form-check-label" htmlFor={category}>
                      {category}
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
                    {<ImStarFull />}
                    {<ImStarEmpty />}
                    {<ImStarEmpty />}
                    {<ImStarEmpty />}
                    {<ImStarEmpty />}
                  </label>
                </li>
                <li className="review-item">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="2star"
                  />
                  <label className="form-check-label" htmlFor="2star">
                    {<ImStarFull />}
                    {<ImStarFull />}
                    {<ImStarEmpty />}
                    {<ImStarEmpty />}
                    {<ImStarEmpty />}
                  </label>
                </li>
                <li className="review-item">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="3star"
                  />
                  <label className="form-check-label" htmlFor="3star">
                    {<ImStarFull />}
                    {<ImStarFull />}
                    {<ImStarFull />}
                    {<ImStarEmpty />}
                    {<ImStarEmpty />}
                  </label>
                </li>
                <li className="review-item">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="4star"
                  />
                  <label className="form-check-label" htmlFor="4star">
                    {<ImStarFull />}
                    {<ImStarFull />}
                    {<ImStarFull />}
                    {<ImStarFull />}
                    {<ImStarEmpty />}
                  </label>
                </li>
                <li className="review-item">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="5star"
                  />
                  <label className="form-check-label" htmlFor="5star">
                    {<ImStarFull />}
                    {<ImStarFull />}
                    {<ImStarFull />}
                    {<ImStarFull />}
                    {<ImStarFull />}
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
