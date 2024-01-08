import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToWishlist } from "../Redux/Slices/wishlistSlice";
import { addtoCart } from "../Redux/Slices/cartSlice";
import Header from "../Components/Header";

function View() {
  const { id } = useParams();
  const { loading } = useSelector((state) => state.productSlice);
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlistSlice);
  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("products"));
    setProduct(products.find((product) => product.id == id));
  }, []);
  console.log(product);
  const handleWishlist = (product) => {
    const existingProduct = wishlist.find((item) => item.id == product.id);
    if (existingProduct) alert("Product already exits");
    else dispatch(addToWishlist(product));
  };
  return (
    <>
      <Header />
      <div className="my-5 container ">
        {loading ? (
          <div className="d-flex justify-content-center my-2">
            <Spinner className="me-3" animation="border" variant="info" />
            Loading...
          </div>
        ) : (
          <div className="row  align-items-center ">
            <div className="col-md-4">
              <img
                src={product?.thumbnail}
                style={{ height: "400px", width: "100%" }}
                alt="product"
              />
            </div>
            <div className="col-md-2"></div>
            <div className="col-md-6">
              <p>Pid : {product?.id}</p>
              <h1>Product {product?.title}</h1>
              <h5 className="fw-bolder ">$ {product?.price}</h5>
              <p style={{ textAlign: "justify" }}>
                <span className="fw-bold">Description:</span>{" "}
                {product?.description}
              </p>
              <div className="d-flex justify-content-between mt-4 ">
                <button
                  onClick={() => handleWishlist(product)}
                  className="btn btn-outline-dark  fs-5 "
                >
                  <i className="fa-solid fa-heart text-danger me-1 "></i>
                  Wishlist
                </button>
                <button
                  onClick={() => dispatch(addtoCart(product))}
                  className="btn btn-outline-dark  fs-5 "
                >
                  <i className="fa-solid fa-cart-plus text-success me-1 "></i>
                  Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default View;
