import React, { useState, useRef } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";
import "./index.css";
// BootStrap Imports
import { Container, Navbar, Nav, Button, Badge } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../redux/actions/authActions";

const NavBar = () => {
  const [toggleState, setToggleState] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const loginUser = useSelector((state) => state.loginUser);
  const { userInfo } = loginUser;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const ref = useRef();
  const handleToggle = (e) => {
    setToggleState(!toggleState);
  };
  const handleLogout = () => {
    dispatch(logout());
    history.push("/login");
  };
  return (
    <Container fluid className="p-0 border-bottom">
      <Navbar
        ref={ref}
        collapseOnSelect
        expand="lg"
        bg="light"
        variant="light"
        className=" py-3 px-3 font-weight-bold "
        onToggle={handleToggle}
        expanded={toggleState}
      >
        <LinkContainer exact={true} to="/">
          <Navbar.Brand className="myBrand font-weight-bolder pr-1">
            <i className="fas fa-heartbeat mr-2"></i>
            Medico
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="mytoggle border border-primary  "
          onClick={handleToggle}
        >
          <i className="fas fa-bars text-primary "></i>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav ">
          <Nav className="mr-auto ">
            <LinkContainer
              exact={true}
              activeStyle={{ borderBottom: "2px solid #09dca4" }}
              to="/"
            >
              <Nav.Link className="text-dark myLink">
                <i className="fas fa-home mr-2"></i>Home
              </Nav.Link>
            </LinkContainer>

            <LinkContainer
              exact={true}
              activeStyle={{ borderBottom: "2px solid #09dca4" }}
              to="/cart"
            >
              <Nav.Link className="text-dark myLink  d-lg-none cart-button">
                <i
                  className="fas fa-shopping-cart mr-2"
                  style={{ transform: "scaleX(-1)" }}
                ></i>
                Cart
                <Badge
                  variant="info"
                  className="rounded-circle cart-link-badge"
                >
                  {cartItems.length}
                </Badge>
              </Nav.Link>
            </LinkContainer>
          </Nav>
          {!userInfo ? (
            <Nav>
              <LinkContainer
                exact={true}
                activeStyle={{ borderBottom: "2px solid #09dca4" }}
                to="/cart"
              >
                <Nav.Link className="text-dark myLink d-none d-lg-block mt-2 cart-button">
                  <>
                    <i
                      className="fas fa-shopping-cart mr-2"
                      style={{ transform: "scaleX(-1)" }}
                    ></i>
                    Cart
                    <Badge
                      variant="info"
                      className="rounded-circle cart-link-badge"
                    >
                      {cartItems.length}
                    </Badge>
                  </>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer exact={true} to="/login">
                <Nav.Link>
                  <Button
                    variant="outline-primary"
                    className="font-weight-bold my-btn "
                    block
                  >
                    <i className="fas fa-sign-in-alt mr-2 "></i>Login / Sign-Up
                  </Button>
                </Nav.Link>
              </LinkContainer>
            </Nav>
          ) : (
            <Nav>
              {userInfo.isAdmin && (
                <>
                  <LinkContainer
                    exact={true}
                    activeStyle={{ borderBottom: "2px solid #09dca4" }}
                    to="/allorders"
                  >
                    <Nav.Link className="text-dark myLink  mt-2 ">
                      All Orders
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer
                    exact={true}
                    activeStyle={{ borderBottom: "2px solid #09dca4" }}
                    to="/addProduct"
                  >
                    <Nav.Link className="text-dark myLink  mt-2 ">
                      Add Product
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer
                    exact={true}
                    activeStyle={{ borderBottom: "2px solid #09dca4" }}
                    to="/allProducts"
                  >
                    <Nav.Link className="text-dark myLink  mt-2 ">
                      All Products
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer
                    exact={true}
                    activeStyle={{ borderBottom: "2px solid #09dca4" }}
                    to="/alluser"
                  >
                    <Nav.Link className="text-dark myLink  mt-2 ">
                      All User
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}

              <LinkContainer
                exact={true}
                activeStyle={{ borderBottom: "2px solid #09dca4" }}
                to="/cart"
              >
                <Nav.Link className="text-dark myLink d-none d-lg-block mt-2 cart-button">
                  <>
                    <i
                      className="fas fa-shopping-cart mr-1"
                      style={{ transform: "scaleX(-1)" }}
                    ></i>
                    Cart
                    <Badge
                      variant="info"
                      className="rounded-circle cart-link-badge"
                    >
                      {cartItems.length}
                    </Badge>
                  </>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer
                exact={true}
                activeStyle={{ borderBottom: "2px solid #09dca4" }}
                to="/orders"
              >
                <Nav.Link className="text-dark myLink  mt-2 ">Orders</Nav.Link>
              </LinkContainer>

              <Nav.Link className="d-none d-lg-block">
                <Button
                  variant="primary"
                  className="font-weight-bold my-btn "
                  block
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Nav.Link>

              {/* <DropDown userDetails={""} /> */}
              <Nav.Link
                className="d-lg-none text-dark m-0 p-0 border d-flex align-items-center px-3"
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt mr-2 "></i>Sign Out
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default NavBar;
