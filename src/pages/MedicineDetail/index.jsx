import { useState, useEffect } from "react";
import { Alert, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Detail from "../../components/Medicine/Detail";
import Loader from "../../components/Reuseable/Loader";
import { getProductById } from "../../utils/api";

const MedicineDetail = ({ match }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!product) {
      setLoading(true);
      getProductById(productId).then((res) => {
        const { product, message } = res;
        if (product) {
          setProduct(product);
        }
        if (message) {
          setError(message);
        }
        setLoading(false);
      });
    }
  }, [product, productId]);
  return (
    <>
      <Container fluid className="m-0 p-0  mt-0">
        {error ? (
          <Alert variant="danger" className="w-100">
            {error}
          </Alert>
        ) : (
          <></>
        )}
        {loading ? (
          <Loader />
        ) : (
          product && <Detail setProduct={setProduct} product={product} />
        )}
      </Container>
    </>
  );
};

export default MedicineDetail;
