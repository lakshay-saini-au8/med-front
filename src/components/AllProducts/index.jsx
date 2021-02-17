import { useState, useEffect } from "react";
import { Container, Row, Col, Table, Badge, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
import { deleteProductById, getAllProducts } from "../../utils/api";
import Loader from "../Reuseable/Loader";
const AllProducts = () => {
  const loginUser = useSelector((state) => state.loginUser);
  const { userInfo } = loginUser;
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
  }, [products, userInfo.token]);
  const deleteProduct = (productId) => {
    setLoading(true);
    deleteProductById(userInfo.token, productId).then((res) => {
      const { success, message } = res;
      if (success) {
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
      if (message) {
        setError(message);
      }
    });
  };
  return (
    <Container>
      <Row>
        <Col>
          {error && error}
          <Table responsive className="m-0 mt-3 ">
            <thead>
              <tr>
                <th className="border-0">Image</th>
                <th className="border-0">Name</th>
                <th className="border-0">Category</th>
                <th className="border-0">Price</th>
                {userInfo.isAdmin && <th className="border-0">Action</th>}
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <Loader />
              ) : (
                products &&
                products.map((product) => (
                  <tr className="table-row " key={product._id}>
                    <td className="align-middle">
                      <Image
                        src={product.image}
                        className="rounded-circle mr-1 p-0 d-inline-block"
                        style={{ width: "40px", height: "40px" }}
                      ></Image>
                    </td>

                    <td className="align-middle">
                      <p>{product.name.slice(0, 20)}</p>
                    </td>
                    <td className="align-middle">
                      <p>{product.category}</p>
                    </td>
                    <td className="align-middle">
                      <p>₹{product.price}</p>
                    </td>

                    {userInfo.isAdmin && (
                      <>
                        <td className="align-middle ">
                          <Badge
                            className="p-2 mb-3 mr-1 print-button"
                            onClick={() => {
                              deleteProduct(product._id);
                            }}
                          >
                            Delete
                          </Badge>
                        </td>
                        <td className="align-middle ">
                          <LinkContainer to={`editProduct/${product._id}`}>
                            <Badge className="p-2 mb-3 mr-1 print-button">
                              Edit
                            </Badge>
                          </LinkContainer>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default AllProducts;
