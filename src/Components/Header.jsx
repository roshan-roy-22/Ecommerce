import React from "react";
import { useState, useEffect } from "react";
import { Container, Navbar, Button, Nav, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { productSearch } from "../Redux/Slices/productSlice";

function Header({insideHome}) {
  const [wishlistCount, setWishListCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  // const wishlist = useSelector((state) => state.wishlistSlice.wishlist);
  const { wishlist } = useSelector((state) => state.wishlistSlice);
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cartReducer);
  useEffect(() => {
    setWishListCount(wishlist?.length);
    setCartCount(cart?.length);
  }, [wishlist, cart]);

  return (
    <>
      <Navbar className="bg-info ">
        <Container>
          <Navbar.Brand className="text-white" href="#home">
            {" "}
            <Link
              to={"/"}
              className="text-white fw-bolder text-decoration-none "
            >
              <i class="fa-brands fa-shopify me-1 "></i>
              E-commerce
            </Link>
          </Navbar.Brand>
          <Nav className="ms-auto ">
            {insideHome && (
              <Nav.Link className="">
                <input
                  onChange={(e) =>
                    dispatch(productSearch(e.target.value.toLowerCase()))
                  }
                  type="text"
                  className="form-control "
                  placeholder="Search Product"
                />
              </Nav.Link>
            )}
            <Nav.Link className="btn border me-2 ">
              <Link
                to="/wishlist"
                className="d-flex align-items-center"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                <i className="fa-solid fa-heart text-danger me-2"></i> Wishlist
                <Badge className="ms-2 rounded" bg="light">
                  {wishlistCount}
                </Badge>
              </Link>
            </Nav.Link>

            <Nav.Link className="btn border">
              <Link
                to="/cart"
                className="d-flex align-items-center"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                <i class="fa-brands fa-opencart me-2 "></i> Cart
                <Badge className="ms-2 rounded" bg="light">
                  {cartCount}
                </Badge>
              </Link>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
