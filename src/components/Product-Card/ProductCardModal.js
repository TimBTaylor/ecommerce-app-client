import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./ProductCard.css";
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { IoCartOutline } from "react-icons/io5";
import { HiOutlineHeart } from "react-icons/hi";
import { IoChevronBack } from "react-icons/io5";
import { addToCart } from "../../actions/addToCart";
import { addToWishlist } from "../../actions/addToWishlist";

export const ProductCardModal = (props) => {
  const [title, setTitle] = useState("");
  const [productQuantity, setProductQuantity] = useState(1);
  const [productSize, setProductSize] = useState();
  const [addedToCart, setAddedToCart] = useState();
  const [sizeInvalid, setSizeInvalid] = useState(false);
  const [modalView, setModalView] = useState(true);
  const product = props.product;

  const dispatch = useDispatch();
  const history = useHistory();

  const productTitle = product.title;
  const sizes = product.sizes;
  const productType = product.type;

  const guest = useSelector((state) => state.userInfoReducer.guest);

  const allProducts = useSelector((state) => state.productReducer.data);

  const cart = useSelector((state) => state.userInfoReducer.cart);

  const wishlist = useSelector((state) => state.userInfoReducer.wishlist);

  const mayAlsoLike = [];

  allProducts.map((products) => {
    if (
      products.type === productType &&
      products.title !== productTitle &&
      products.gender === product.gender &&
      mayAlsoLike.length < 4
    ) {
      mayAlsoLike.push(products);
    }
    return mayAlsoLike;
  });

  const settingTitle = (title) => {
    if (title.length > 60) {
      const newTitle = title.substring(0, 60);
      setTitle(newTitle + "...");
    } else {
      setTitle(title);
    }
  };

  useEffect(() => {
    if (product.sizes !== undefined) {
      settingTitle(productTitle);
    }
    setModalView(true);
  }, [product.sizes, productTitle]);

  const productId = product._id;
  const userId = localStorage.getItem("userId");

  const increaseProductQuantity = () => {
    if (productQuantity < product.quantity) {
      setProductQuantity(productQuantity + 1);
    }
  };

  const decreaseProductQuantity = () => {
    if (productQuantity > 1) {
      setProductQuantity(productQuantity - 1);
    }
  };

  const routeToProductview = () => {
    dispatch({
      type: "SET_PRODUCT_VIEW",
      payload: productId,
    });
    history.push("/product-view");
  };

  const addProductToCart = () => {
    if (productSize !== undefined && productSize !== "SIZE") {
      if (guest) {
        let currentProduct = {
          productId,
          quantity: productQuantity,
          size: productSize,
        };
        let cartArray = cart;
        cartArray.push(currentProduct);
        dispatch({
          type: "SET_CART",
          payload: cartArray,
        });
        setSizeInvalid(false);
        setAddedToCart(true);
      } else {
        dispatch(addToCart(userId, productId, productQuantity, productSize));
        setSizeInvalid(false);
        setAddedToCart(true);
      }
    } else {
      setSizeInvalid(true);
    }
  };

  const addProductToWishlist = () => {
    if (productSize !== undefined && productSize !== "SIZE") {
      const guest = localStorage.getItem("guest");
      if (guest) {
        let currentProduct = {
          productId,
          quantity: productQuantity,
          size: productSize,
        };
        let wishlistArray = wishlist;
        wishlistArray.push(currentProduct);
        dispatch({
          type: "SET_WISHLIST",
          payload: wishlistArray,
        });
        setSizeInvalid(false);
        setAddedToCart(false);
      } else {
        dispatch(
          addToWishlist(userId, productId, productQuantity, productSize)
        );
        setSizeInvalid(false);
        setAddedToCart(false);
      }
    } else {
      setSizeInvalid(true);
    }
  };

  return (
    <>
      {product.sizes !== undefined ? (
        <>
          <div className="container">
            <div
              className="modal left fade"
              id="productModal"
              tabIndex=""
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div
                className="modal-dialog product-modal-dialog"
                role="document"
              >
                <div className="modal-content product-modal-content">
                  <div className="modal-header quickshop-modal-header">
                    <p className="quickshop-title">Quick View</p>
                    <button
                      type="button"
                      className="close quickshop-close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body product-modal-body">
                    <p className="quickshop-product-title">{title}</p>
                    <img
                      src={product.image}
                      alt="product-img"
                      className="quickshop-product-image"
                    />
                    <hr className="line-break" />
                    <div className="quickshop-price-container">
                      <p className="quickshop-price-title">Price:</p>
                      <p className="quickshop-price-number">${product.price}</p>
                    </div>
                    <hr className="line-break quickshop-linebreak" />
                    <div className="quickshop-price-size-container">
                      <div className="quickshop-size-container">
                        <select
                          className={
                            sizeInvalid
                              ? "form-select quickshop-sizes invalid"
                              : "form-select quickshop-sizes"
                          }
                          aria-label="Default select example"
                          onChange={(e) => {
                            setProductSize(e.target.value);
                          }}
                        >
                          <option disabled selected>
                            SIZE
                          </option>
                          {sizes.map((size) => {
                            return (
                              <option value={size} key={size}>
                                {size}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="quickshop-quantity-container">
                        <button
                          className="quickshop-minus"
                          onClick={() => decreaseProductQuantity()}
                        >
                          <AiOutlineMinus />
                        </button>
                        <p className="current-quantity">{productQuantity}</p>
                        <button
                          className="quickshop-plus"
                          onClick={() => increaseProductQuantity()}
                        >
                          <AiOutlinePlus />
                        </button>
                      </div>
                    </div>
                    <hr className="line-break quickshop-linebreak" />
                    <div
                      className="quickshop-add-product"
                      onClick={() => {
                        addProductToCart();
                      }}
                      data-dismiss="modal"
                      data-target="#productAddedModal"
                      data-toggle="modal"
                    >
                      <p className="quickshop-add-to-cart">ADD TO CART</p>
                      <IoCartOutline className="quickshop-cart-icon" />
                    </div>
                    <div
                      className="quickshop-add-wishlist"
                      onClick={() => {
                        addProductToWishlist();
                      }}
                      data-target="#productAddedModal"
                      data-dismiss="modal"
                      data-toggle="modal"
                    >
                      <p className="quickshop-add-to-wishlist">
                        ADD TO WISH LIST
                      </p>
                      <HiOutlineHeart className="quickshop-wishlist-icon" />
                    </div>
                    <p
                      onClick={() => routeToProductview()}
                      className="quickshop-view-all-details"
                      data-dismiss="modal"
                    >
                      View All Details
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {modalView ? (
            <div className="container">
              <div
                className="modal left fade"
                id="productAddedModal"
                tabIndex=""
                role="dialog"
                aria-labelledby="ModalLabel"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog product-modal-dialog"
                  role="document"
                >
                  <div className="modal-content product-modal-content">
                    <div className="modal-header quickshop-modal-header">
                      <button
                        className="product-added-back-container"
                        data-dismiss="modal"
                        data-toggle="modal"
                        data-target="#productModal"
                      >
                        <IoChevronBack className="product-added-arrow" />
                        <p className="product-added-back">Back</p>
                      </button>
                      <button
                        type="button"
                        className="close quickshop-close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body product-added-modal-body">
                      <p className="product-added-modal-title">
                        {addedToCart ? "Added to cart:" : "Added to wishlist:"}
                      </p>
                      <div className="product-added-product-information">
                        <img
                          className="product-added-product-image"
                          src={product.image}
                          alt="product"
                        />
                        <div className="product-added-product-details">
                          <p className="product-added-product-title">{title}</p>
                          <p className="product-added-product-price">
                            ${product.price}
                          </p>
                          <p className="product-added-product-size">
                            Size: {productSize}
                          </p>
                          <p className="product-added-product-quantity">
                            Qty: {productQuantity}
                          </p>
                        </div>
                      </div>
                      <div
                        className="product-added-keep-shopping-container"
                        data-dismiss="modal"
                      >
                        <p className="product-added-keep-shopping">
                          KEEP SHOPPING
                        </p>
                      </div>
                      <div
                        className="product-added-view-cart-container"
                        data-dismiss="modal"
                        onClick={() =>
                          addedToCart
                            ? history.push("/cart")
                            : history.push("/wishlist")
                        }
                      >
                        <p className="product-added-view-cart">
                          {addedToCart ? "VIEW CART" : "VIEW WISHLIST"}{" "}
                        </p>
                        {addedToCart ? (
                          <IoCartOutline className="product-added-cart-icon" />
                        ) : (
                          <HiOutlineHeart className="product-added-wishlist-icon" />
                        )}
                      </div>
                      <hr className="line-break quickshop-linebreak" />
                      <div className="product-added-also-like-container">
                        <p className="product-added-also-like-title">
                          You may also like:
                        </p>
                        <div className="product-added-also-like-products">
                          {mayAlsoLike.map((product) => {
                            const key = Math.floor(
                              Math.random() * 99999999999999
                            );
                            return (
                              <div
                                className="product-added-also-like-product"
                                key={key}
                                data-dismiss="modal"
                              >
                                <img
                                  className="product-added-also-like-image"
                                  src={product.image}
                                  alt="product"
                                  onClick={() => routeToProductview()}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </>
      ) : (
        <div></div>
      )}
    </>
  );
};
