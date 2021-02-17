import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";
import { placeOrder } from "../../../utils/api";
const CartRight = ({ details, item }) => {
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.loginUser);
  const { userInfo } = loginUser;
  const handleBooking = async (data) => {
    const final = {
      orderItems: item,
      taxPrice: details.tax,
      shippingPrice: details.shipping,
      totalPrice: details.total,
      isPaid: true,
      paidAt: Date.now(),
    };
    await placeOrder(userInfo.token, final);

    dispatch({ type: "CART_CLEAR_ITEMS" });
  };
  return (
    <>
      <Row className="my-4 font-weight-bold text-muted">
        <Col className="d-flex justify-content-between">
          Total Items{" "}
          <span className="text-dark font-weight-bolder">{details.qty}</span>
        </Col>
      </Row>
      <Row className="my-4 font-weight-bold text-muted">
        <Col className="d-flex justify-content-between">
          Sub Total{" "}
          <span className="text-dark font-weight-bolder">
            ₹ {details.subTotal}
          </span>
        </Col>
      </Row>
      <Row className="my-4 font-weight-bold text-muted">
        <Col className="d-flex justify-content-between">
          Shipping Cost{" "}
          <span className="text-dark font-weight-bolder">
            ₹ {details.shipping}
          </span>
        </Col>
      </Row>
      <Row className="my-4 font-weight-bold text-muted">
        <Col className="d-flex justify-content-between">
          Tax{" "}
          <span className="text-dark font-weight-bolder">₹ {details.tax}</span>
        </Col>
      </Row>
      <Row className="my-2 px-3 font-weight-bold text-muted">
        <Col
          className="w-100 p-0 pt-2 d-flex justify-content-between"
          style={{
            fontSize: "20px",
            borderTop: "2px solid black",
          }}
        >
          Total{" "}
          <span className="text-dark font-weight-bolder">
            ₹ {details.total}
          </span>
        </Col>
      </Row>
      <Row className="my-2 px-3 font-weight-bold text-muted">
        {!userInfo ? (
          <Link to="login" className=" w-100">
            <Button
              as={Col}
              variant={"info"}
              className="font-weight-bold mt-3 py-2"
            >
              Login To Pay
            </Button>
          </Link>
        ) : (
          <PayPalButton
            amount={details.total}
            onSuccess={handleBooking}
            options={{
              currency: "INR",
            }}
          />
        )}
      </Row>
    </>
  );
};

export default CartRight;
