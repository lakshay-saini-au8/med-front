import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { addProduct, getProductById, updateProduct } from "../../utils/api";
import Loader from "../Reuseable/Loader";
const AddProduct = () => {
  const { register, errors, getValues, handleSubmit, setValue } = useForm();
  const history = useHistory();
  const loginUser = useSelector((state) => state.loginUser);
  const { loading: userLoading, userInfo, error: userError } = loginUser;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = (data) => {
    console.log(data);
    setLoading(true);
    addProduct(userInfo.token, data).then((res) => {
      const { status, data, message } = res;

      if (status) {
        history.push(`product/detail/${data._id}`);
      }
      if (message) {
        setError(message);
      }
      setLoading(false);
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
              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  placeholder="Price"
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
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Example select</Form.Label>
                <Form.Control
                  as="select"
                  name="category"
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
              {loading ? (
                <Button variant="primary">Adding Product</Button>
              ) : (
                <Button variant="primary" type="submit">
                  Add Product
                </Button>
              )}
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AddProduct;
