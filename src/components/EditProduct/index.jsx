import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getProductById, updateProduct } from "../../utils/api";
import Loader from "../Reuseable/Loader";
const EditProduct = () => {
  const { productId } = useParams();

  const { register, errors, getValues, handleSubmit, setValue } = useForm();

  const loginUser = useSelector((state) => state.loginUser);
  const { loading: userLoading, userInfo, error: userError } = loginUser;
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
  }, [product, userInfo.token, productId, setValue]);
  const onSubmit = (data) => {
    setLoading(true);
    updateProduct(userInfo.token, product._id, data).then((res) => {
      const { status, message } = res;
      if (status) {
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
      if (message) {
        setError(message);
      }
    });
  };
  return (
    <Container className="mt-5" fluid>
      <Row className="justify-content-center  align-items-center">
        <Col className=" col-10 col-sm-6 col-md-4 p-4 border rounded ">
          {error && (
            <Alert variant={"danger"} className="text-center">
              {error}
            </Alert>
          )}
          {loading ? (
            <Loader />
          ) : (
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  defaultValue={product && product.name}
                  placeholder="Enter Product Name"
                  ref={register({
                    required: "true",
                    minLength: 1,
                  })}
                />
                {errors.name && (
                  <p style={{ color: "red", paddingTop: "4px" }}>
                    Name is required
                  </p>
                )}
              </Form.Group>

              <Form.Group controlId="desciprtion">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  placeholder="Description"
                  defaultValue={product && product.description}
                  ref={register({
                    required: true,
                    minLength: 50,
                  })}
                />
                {errors.description && (
                  <p style={{ color: "red", paddingTop: "4px" }}>
                    Description is req. and min len is 50
                  </p>
                )}
              </Form.Group>
              <Form.Group controlId="image">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="url"
                  name="image"
                  placeholder="Image URL"
                  defaultValue={product && product.image}
                  ref={register({
                    required: true,
                    minLength: 10,
                  })}
                />
                {errors.description && (
                  <p style={{ color: "red", paddingTop: "4px" }}>
                    Img URL is required
                  </p>
                )}
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Example select</Form.Label>
                <Form.Control
                  as="select"
                  name="category"
                  defaultValue={product && product.category}
                  ref={register({
                    required: true,
                  })}
                >
                  <option value="family-care">Family care</option>
                  <option value="skin-care">Skin care</option>
                  <option value="hair-care">Hair care</option>
                  <option value="lip-care">Lip care</option>
                  <option value="mens-care">Mens care</option>
                  <option value="womens-care">Womens care</option>
                  <option value="baby-care">Baby care</option>
                  <option value="medicine">Medicine</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  defaultValue={product && product.price}
                  placeholder="Price"
                  max="999"
                  ref={register({
                    required: true,
                  })}
                />
                {errors.price && (
                  <p style={{ color: "red", paddingTop: "4px" }}>
                    Price is required
                  </p>
                )}
              </Form.Group>

              <Button variant="primary" type="submit">
                Update Product
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default EditProduct;
