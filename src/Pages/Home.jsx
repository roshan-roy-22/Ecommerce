import React, { useEffect } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchProducts,
  onNavigateNext,
  onNavigatePrev,
} from "../Redux/Slices/productSlice";
import Spinner from "react-bootstrap/Spinner";
import { addToWishlist } from "../Redux/Slices/wishlistSlice";
import { addtoCart } from "../Redux/Slices/cartSlice";
import Header from "../Components/Header";

function Home() {
  const dispatch = useDispatch();
  const { loading, products, error, productsPerPage, currentPage } =
    useSelector((state) => state.productSlice);
  const { wishlist } = useSelector((state) => state.wishlistSlice);

  const totalPages = Math.ceil(products?.length / productsPerPage);
  const indexOfLastItem = currentPage * productsPerPage;
  const indexOfFirstItem = indexOfLastItem - productsPerPage;
  const visibleCards = products?.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  const handleWishlist = (product) => {
    const existingProduct = wishlist.find((item) => item.id == product.id);
    if (existingProduct) alert("Product already exits");
    else dispatch(addToWishlist(product));
  };

  const navigatePrev = () => {
    if (currentPage != 1) {
      dispatch(onNavigatePrev());
    }
  };

  const navigateNext = () => {
    if (currentPage != totalPages) {
      dispatch(onNavigateNext());
    }
  };

  return (
    <>
      <Header insideHome />
      <div className="container mx-auto mt-1 ">
        {loading ? (
          <div className="d-flex justify-content-center my-2">
            <Spinner className="me-3" animation="border" variant="info" />
            Loading...
          </div>
        ) : (
          <Row className="mt-5 container">
            {products.length > 0 ? (
              visibleCards.map((product, index) => (
                <Col key={index} className="mb-5" sm={12} md={6} lg={4} xl={3}>
                  <Card className="shadow rounded" style={{ width: "18rem" }}>
                    <Link to={`/view/${product.id}`}>
                      <Card.Img
                        variant="top"
                        style={{ height: "180px" }}
                        src={product.thumbnail}
                      />
                    </Link>
                    <Card.Body>
                      <Card.Title style={{ height: "50px" }}>
                        {product.title.slice(0, 20)}...
                      </Card.Title>
                      <div className="d-flex justify-content-between">
                        <Button
                          onClick={() => handleWishlist(product)}
                          className="btn btn-light fs-5"
                        >
                          <i className="fa-solid fa-heart text-danger"></i>
                        </Button>
                        <Button
                          onClick={() => dispatch(addtoCart(product))}
                          className="btn btn-light fs-5"
                        >
                          <i className="fa-solid fa-cart-shopping text-success"></i>
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <div className="text-center text-danger my-3 ">
                <h1 className="fw-bolder ">Product not found !</h1>
              </div>
            )}
            <div className="d-flex justify-content-center align-items-center fw-bolder mb-2 ">
              <span onClick={navigatePrev} className="btn btn-link">
                {" "}
                <i className="fa-solid fa-angles-left text-dark fw-bolder"></i>{" "}
              </span>
              <span>
                {" "}
                {currentPage} of {totalPages}{" "}
              </span>
              <span onClick={navigateNext} className="btn btn-link">
                {" "}
                <i className="fa-solid fa-angles-right text-dark fw-bolder"></i>{" "}
              </span>
            </div>
          </Row>
        )}
      </div>
    </>
  );
}

export default Home;
