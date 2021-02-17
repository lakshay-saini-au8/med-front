import React from "react";
import { Col, Image, Row } from "react-bootstrap";
const ProductDetailLeft = ({ product }) => {
  return (
    <>
      <Row className="px-2 px-lg-0">
        <Col
          lg={4}
          className="d-flex justify-content-center align-items-center mb-3"
        >
          <Image
            src={product.image}
            style={{
              height: "280px",
              maxWidth: "100%",
              minWidth: "280px",
            }}
          ></Image>
        </Col>
        <Col lg={8}>
          <h4 className="text-truncate">{product.name}</h4>

          <p>{product.description}</p>
          <p className="p-1 product-card-category rounded font-weight-bold">
            {product.category[0].toUpperCase() + product.category.slice(1)}
          </p>
          <h2>₹ {product.price}.00</h2>
        </Col>
      </Row>
    </>
  );
};

export default ProductDetailLeft;
