import React from "react";
import { Col, Row, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./index.css";
import { addToCart } from "../../../redux/actions/cartAction";
const ProductCard = ({ product, md, lg, xl }) => {
  const dispatch = useDispatch();
  const handleCart = () => {
    dispatch(addToCart(product._id, 1));
  };
  return (
    <>
      <Col
        xs={12}
        sm={6}
        md={md}
        lg={lg}
        className="p-0  rounded"
        key={product._id}
      >
        <Card className="p-3 m-2 product-card">
          <Link
            to={`/product/detail/${product._id}`}
            style={{ textDecoration: "none" }}
            className="text-dark"
          >
            <Image
              src={product.image}
              className="product-card-img"
              style={{ width: "100%", height: "230px" }}
            ></Image>
            <Card.Title className="mb-4 product-card-title m-2 text-capitalize text-truncate">
              {product.name}
            </Card.Title>
          </Link>

          <Row className="px-2 m-0 d-flex justify-content-between align-items-center">
            <h3 className="m-0">₹ {product.price}.00 </h3>
            <i
              className="fas fa-shopping-cart p-3 rounded-circle add-cart-button"
              onClick={handleCart}
            ></i>
          </Row>
        </Card>
      </Col>
    </>
  );
};

export default ProductCard;
