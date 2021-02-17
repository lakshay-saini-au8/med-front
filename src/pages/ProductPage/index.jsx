import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Filter from "../../components/Medicine/Filter";
import Products from "../../components/Medicine/Products";
import { getAllProducts } from "../../utils/api";

const ProductPage = ({ match }) => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!products) {
      setLoading(true);
      getAllProducts().then((res) => {
        const { data, message } = res;
        if (data) {
          setProducts(data);
        }
        if (message) {
          setError(message);
        }
        setLoading(false);
      });
    }
  }, [products]);
  return (
    <div>
      <Container
        fluid
        className="pt-4"
        style={{ backgroundColor: "#dddddd40" }}
      >
        <Row>
          <Filter
            setProducts={setProducts}
            setLoading={setLoading}
            setError={setError}
          />
          <Products products={products} loading={loading} error={error} />
        </Row>
      </Container>
    </div>
  );
};

export default ProductPage;
