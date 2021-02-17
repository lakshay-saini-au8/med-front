import { Col, Row } from "react-bootstrap";
import ErrorMessage from "../../Reuseable/ErrorMessage";
import Loader from "../../Reuseable/Loader";
import ProductCard from "../../Reuseable/ProductCard";
import "./index.css";
const Products = ({ loading, error, products }) => {
  return (
    <Col lg={9} className=" rounded ">
      <Row className="mt-3 p-3 bg-white">
        {loading ? (
          <div style={{ width: "100%", height: "50vh" }}>
            <Loader />
          </div>
        ) : error ? (
          <ErrorMessage error={error} />
        ) : (
          products &&
          products.map((product) => (
            <ProductCard product={product} md={4} lg={3} xl={3} />
          ))
        )}
      </Row>
    </Col>
  );
};

export default Products;
